const { hash, compare } = require("bcrypt");
const Manager = require("../model/manager_model");
const jwt = require("jsonwebtoken");

module.exports = {
  addManagerForAdmin: async (req, res) => {
    try {
      const { manager_password, manager_email } = req.body;

      if (!manager_password || !manager_email) {
        throw new Error("you need to insert all credential to inputs");
      }

      const hashPass = await hash(manager_password, 10);

      if (!hashPass) throw new Error("try again");
      const user = req.body;
      user.manager_password = hashPass;

      const newUser = new Manager(req.body);
      await newUser.save();

      user.manager_password = "*******";

      //  await transporter.sendMail(mail)

      return res.status(200).json({
        message: "successfully to register user",
        success: true,
        user: req.body,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to register user",
        success: false,
        error: error.message,
      });
    }
  },
  loginManager: async (req, res) => {
    try {
      const { manager_email, manager_password } = req.body;

      if (!manager_email || !manager_password) {
        throw new Error("all field be required");
      }

      const user = await Manager.findOne({ manager_email });

      if (!user) throw new Error("user dont exist");

      const isMatch = await compare(manager_password, user.manager_password);

      if (!isMatch) throw new Error("user password dont valid");

      const payload = { id: user._id, role: "manager" };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 3,
      });

      //  await Manager.findByIdAndUpdate(user._id,{
      //   token:{token:token}
      //  })

      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
      });

      return res.status(200).json({
        message: "successfully to login user",
        success: true,
        token,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
  authManager: async (req, res) => {
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("must be token for this action");

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) throw new Error("token not valid");

      const payload = {
        id: decode.id,
        role: decode.role,
      };

      const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 3,
      });

      res.cookie("token", newToken, {
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
      });

      return res.status(200).json({
        message: "successfully to auth user",
        success: true,
        newToken,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
  logoutManager: async (req, res) => {
    try {
      res.clearCookie("token");

      return res.status(200).json({
        message: "successfully to logout user",
        success: true,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
};
