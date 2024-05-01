const router = require("express").Router();
const { registerUser , loginUser , logOut , authUser } = require("../controller/user_controller");
const { addManagerForAdmin , loginManager , authManager , logoutManager} = require("../controller/manager_controller");
const jwtAuth = require("../middleware/jwtAuth");
//path - localhost:3000/users

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/auth",jwtAuth,authUser)
router.get("/logout",logOut)

//manager router
router.post("/admin/add-manager",addManagerForAdmin);
router.post("/manager/login",loginManager);
router.get("/manager/auth",authManager);
router.get("/manager/logout",logoutManager);



module.exports = router;
