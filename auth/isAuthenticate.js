const jwt = require("jsonwebtoken");
const customeError = require("./customeError");
const User = require("../models/userModel");

const isAuthenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new customeError("login first", 400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECKRET);

    if (!decode) {
      return next(new customeError("invalid token", 400));
    }

    const id = decode._id;

    const user = await User.findById(id);
    if (!user) {
      return next(new customeError("user not found", 400));
    }

    req.user = user;
    next();
    
  } catch (error) {
    next(new customeError(error.message));
  }
};

module.exports = isAuthenticate;
