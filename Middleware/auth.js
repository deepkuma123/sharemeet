const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "your_jwt_secret"); // Verify the token
    const user = await User.findOne({ _id: decoded._id }); // Find the user by decoded ID

    if (!user) {
      throw new Error();
    }

    req.token = token; // Optional: Store token in request object if needed
    req.user = user; // Set req.user with the user found
    next(); // Call next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
