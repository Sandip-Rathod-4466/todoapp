const User = require("../models/userModel.js");
const customeError = require("../auth/customeError.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // check if user alredy exist
    const existUser = await User.findOne({ email });

    if (existUser) {
      return next(new customeError("user alredy exist", 400));
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 16);

    // create new user
    await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.json({
      success: true,
      message: "user register successfully",
    });
  } catch (error) {
    return next(new customeError(error.message));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check user is exist or not

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new customeError("user not registerd!", 400));
    }

    const veryfiyingPassword = bcrypt.compareSync(password, user.password);

    if (!veryfiyingPassword) {
      return next(new customeError("invalid email or password!", 400));
    }

    // creating a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECKRET);
    res.json({
      success: true,
      message: "login successfully!",
      user,
      token: token,
    });


  } catch (error) {
    next(new customeError(error.message));
  }
};


module.exports = {  loginUser, registerUser,  };
