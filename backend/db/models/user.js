const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema= mongoose.Schema({
    firstName:{type:String,required:true} ,
    lastName: {type:String}  ,
    joinDate: {type:Date ,default:Date.now()} ,
    age: {type:Number},
    email: {type:String,required:true} ,
    password: {type:String,required:true},
    avatar:{type:String} ,
    cover:  {type:String},
    gender: {type:String, required:true},
    album: [{type:String}],
    followers: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    followersCount:{type:Number},
    folowees: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    foloweesCount: {type:Number}
});

userSchema.pre("save", async function () {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
  });

module.exports=mongoose.model("User",userSchema);


// we need function pre save
// avatar : if no avatar set default avatar and cover based on gender
// maybe need function to update followers/folowees counters

