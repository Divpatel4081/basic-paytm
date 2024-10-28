const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();


router.get("/balance",authMiddleware,async (req,res) => {
    const accountDetail = await Account.findOne({
        userId:req.userId,
    })
    res.json({
        balance:accountDetail.balance,
    })
});

router.post('/transfer' , authMiddleware , async (req,res) => {
   const session = await mongoose.startSession();
   session.startTransaction();
   const {amount , to} = req.body;
   const userAccount = await Account.findOne({
        userId: req.userId,
   }).session(session);
   const toAccount = await Account.findOne({
        userId: to,
   }).session(session);

   if(!toAccount){
        await session.abortTransaction();
        return res.json({
            message:"user does no exist",
        })
   }

   if(userAccount.balance < amount){
        await session.abortTransaction();
        return res.json({
            message: "low balance",
        })
   }

   await Account.updateOne({userId:req.userId} , {
        $inc:{
            balance: -amount
        }
   }).session(session);

   await Account.updateOne({userId:to},{
        $inc:{
            balance: +amount
        }
   }).session(session);

   await session.commitTransaction();

   
})