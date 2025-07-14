const { listUser, updateUser, getUserStats, getUserDistribution, getPlanDistribution, getRevenueTrends, getRecentUsers } = require("../controllers/user.controller");
const handleValidationErrors = require("../utils/validateErrors");
const updateUserValidation = require("../validators/user.validator");

const router=require("express").Router()

//stats
router.get("/stats",handleValidationErrors,getUserStats)
router.get("/user-distribution",handleValidationErrors,getUserDistribution)
router.get("/plan-distribution",handleValidationErrors,getPlanDistribution)
router.get("/revenue-trends",handleValidationErrors,getRevenueTrends)
router.get("/recent-users",handleValidationErrors,getRecentUsers)

//users
router.get("/",handleValidationErrors,listUser)
router.put("/:id/update",handleValidationErrors,updateUserValidation,updateUser)


module.exports=router;