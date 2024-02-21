const User = require("./user.mongo");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const jwt = require("jsonwebtoken");

async function register(userInfo) {
  try {
    // Directly using spread operator in creating the user so that MongoDB will handle it and create one user
    console.log(userInfo);
    const user = await User.create({ ...userInfo });

    const token = user.createJWT();
    console.log(token);
    return { user: { name: user.name }, token };
  } catch (error) {
    // Handle any errors that occur during the registration process
    console.error("Error during registration:", error);
    throw error;
  }
}

async function login(loginInfo) {
  const { email, password } = loginInfo;
  if (!email || !password) {
    return new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparepassword(password);
  if (!isPasswordCorrect) {
    return new UnauthenticatedError("Invalid Password");
  }

  const token = user.createJWT();

  return { user: { name: user.name, email: user.email }, token };
}

module.exports = {
  register,
  login,
};
