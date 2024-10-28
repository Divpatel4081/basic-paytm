const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");


const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    //validating token
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.json({
            message: "no token pass or if you passed then start with Bearer",
        })
    }
    //fething token
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.uesrId){
            req.uesrId = decoded.uesrId;
            next();
        }
        else{
            return res.json({
                message:"problem in verifying token",
            })
        }
    }catch(e){
        return res.json({
            error: e,
        })
    }
}

module.exports = {
    authMiddleware,
}