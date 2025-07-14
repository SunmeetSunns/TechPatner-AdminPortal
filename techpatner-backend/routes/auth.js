const { login } = require("../controllers/auth.controller");

const router=require("express").Router()




router.use("/login",login)


module.exports=router;