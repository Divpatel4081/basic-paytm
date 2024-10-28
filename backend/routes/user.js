const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");

router.get("/" , (req, res) => {

})
//sign-up route

const signupSchema = zod.object({
    firstName:zod.string().email(),
    lastName:zod.string(),
    username:zod.string(),
    password:zod.string(),
})

router.post("/signup", async (req,res) => {
    const body = req.body;
    //input validation
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.json({
            message:"email already taken | incorrect input"
        })
    }

    //checking the user if already exist
    const user = await User.findOne({
        username: body.username,   
    });
    if(user._id){
        return res.json({
            message:"email already taken"
        })
    }

    //entering to database 
    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET)

    return res.json({
        message:"user created succefully",
        token:token
    })

})

module.exports = router;