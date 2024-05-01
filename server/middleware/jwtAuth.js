const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

const jwtAuth = async(req,res,next) => {
try {
    //  const token = req.headers.token;
     const token = req.cookies.token;
     
    if(!token) throw new Error("must be token for this action");
    
    const decode = jwt.verify(token,process.env.JWT_SECRET);

   if(!decode) throw new Error("token not valid");


    const { tokens } = await User.findById(decode.id);

    const isValid = tokens.find((t) => t.token === token);

    if(!isValid) throw new Error("token not valid you are scammer");

   req.payload = decode;
   req.token = token;

    next();
} catch (error) {
    return res.status(401).json({
        message:"invalid token",
        error:error.message
    })
}
}

module.exports = jwtAuth;