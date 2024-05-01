const router = require("express").Router();
const { addCategory } = require("../controller/category_controller");



router.post("/add",addCategory)





module.exports = router