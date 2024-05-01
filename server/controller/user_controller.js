const User = require("../model/user_model");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const {mail , transporter } = require("../middleware/mailer");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { user_name, user_password, user_email } = req.body;

      if (!user_name || !user_password || !user_email) {
        throw new Error("you need to insert all credential to inputs");
      }

      const hashPass = await hash(user_password, 10);

      if (!hashPass) throw new Error("try again");
      const user = req.body;
      user.user_password = hashPass;

      const newUser = new User(req.body);
      await newUser.save();

      user.user_password = "*******";


     await transporter.sendMail(mail)

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
  loginUser: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;

      if (!user_email || !user_password) {
        throw new Error("all field be required");
      }

      const user = await User.findOne({ user_email });

      if (!user) throw new Error("user dont exist");

      const isMatch = await compare(user_password, user.user_password);

      if (!isMatch) throw new Error("user password dont valid");

      const payload = { id: user._id, role: "regular" };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 3,
      });

      let oldTokens = user.tokens || [];

      if(oldTokens){
        oldTokens = oldTokens.filter(t => {
              const timeDiff = (Date.now() - parseInt(t.signAt)) / 1000;
              if(timeDiff < ( 60 * 60 * 3)){
                   return t
              }
            })
      };

      
     await User.findByIdAndUpdate(user._id,{
      tokens:[...oldTokens,{token,signAt:Date.now().toString()}]
     })


      // res.cookie("token",token,{maxAge: 1000 * 60 * 60 * 3 })

      return res.status(200).json({
        message: "successfully to login user",
        success: true,
        token
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
  logOut:async (req, res) => {
    try {
       const token = req.headers.authorization;

      const decode = jwt.verify(token,process.env.JWT_SECRET);

      if(!decode){
        throw new Error("token dont verify")
      }
        
      const user = await User.findById(decode.id);
       console.log(user)
      const newTokens = user.tokens.filter(t => t.token !== token);

       await User.findByIdAndUpdate(decode.id,{
        tokens:[...newTokens]
       })

      return res.status(200).json({
        message: "successfully to logout user",
        success: true
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
  authUser:async (req, res) => {
    try {

     const { id , role } = req.payload;

     const payload = {
      id,
      role
     }

     const { tokens } = await User.findById(id);

      const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 3,
      });

      const newTokens = tokens.filter(t => t.token !== req.token);
      console.log(newTokens)

      await User.findByIdAndUpdate(id,{
       tokens:[...newTokens,{token:newToken,signAt:Date.now().toString()}]
      })

      return res.status(200).json({
        message: "successfully to auth user",
        success: true,
        newToken
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  }
};
