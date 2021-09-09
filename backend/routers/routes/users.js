const express=require("express");
const {getUserById,register} = require("../controllers/users")
const usersRouter=express.Router();

usersRouter.post("/",register);
usersRouter.get("/:id",getUserById);

module.exports=usersRouter;