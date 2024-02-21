const User = require("../models/user.mongo");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication upar se invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("coming");
    // Attach the user to the request
    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      throw new UnauthenticatedError("User not found");
    }

    req.user = { userId: user._id, name: user.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication is invalid");
  }
};

module.exports = auth;
