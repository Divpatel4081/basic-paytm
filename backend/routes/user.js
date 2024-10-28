const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

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
    await Account.create({
        userId:dbUser._id,
        balance: 1 + Math.random() * 10000,
    })
    const token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET)

    return res.json({
        message:"user created succefully",
        token:token
    })

})

//sign-in route
const signInSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(6),
})
router.post("/signin" , async (req,res) => {
    const body = req.body;
    //input validation
    const {success} =signInSchema.safeParse(body);
    if(!success){
        return res.json({
            message:"Please enter valid input"
        })
    }

    //cheking the user is already exists
    const dbUser = await User.findOne({
        username:body.username
    })
    if(!dbUser._id){
        return res.json({
            message:"Please sign-up first",
        })   
    }

    const token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET);

    return res.json({
        message:"sign-In succefully",
        token:token
    })
})

//updating informantion 
const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    username: zod.string().optional()
})

router.put('/', authMiddleware , async (req,res) => {
    const {success} = zod.safeParse(req.body);
    if(!success){
        return res.json({
            message:"error in validation",
        })
    }
    await User.updateOne(req.body , {
        id:req.userId
    })
    res.json({
        message:"updated sucefully",
    })
})


//bulk queary
router.get("/bulk" , async (req,res) => {
    const filter = req.query.filter;
    const users = await User.find({
        $or:[
            {
                firstName: {
                    $regex: filter
                }
            },
            {
                lastName:{
                    $regex:filter
                }
            }
        ]
    })
    res.json({
        user:users.map((user) => {
            return {
                username:user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        })
    })
})

module.exports = router;