const router = require("express").Router();
const { addProduct , getAllProducts} = require("../controller/product_controller");
const jwtAuth = require("../middleware/jwtAuth");
const upload = require("../middleware/uploadFiles");

router.post("/add",upload.single('product_image'),addProduct)
router.get("/",getAllProducts)


module.exports = router;