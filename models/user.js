const mongoose=require("mongoose");

const UserSchema = new mongoose.Schema({
    fname :{type:String, required:true,default: null},
    lname :{type:String, required:true},
    email :{type:String , required:true, unique:true},
    password :{type:String, required:true},
    isVerified:{type:Boolean,default:false}
});  //created a user Schema

module.exports = mongoose.model("User",UserSchema);  //created a user model