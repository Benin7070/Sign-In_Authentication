const express=require('express');
const router=express.Router();
const tokenAuth =require('../middleware/token-auth');


router.get("/homepage.html",tokenAuth,(req,res)=>{
    res.send("Welcome to the Homepage!");
});

module.exports=router;