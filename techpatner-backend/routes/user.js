const { listUser, updateUser } = require("../controllers/user.controller");
const handleValidationErrors = require("../utils/validateErrors");
const updateUserValidation = require("../validators/user.validator");

const router=require("express").Router()

router.get("/",handleValidationErrors,listUser)
router.put("/:id/update",handleValidationErrors,updateUserValidation,updateUser)


module.exports=router;