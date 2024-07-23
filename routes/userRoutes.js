const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../Middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { reservationsUrl } = require("twilio/lib/jwt/taskrouter/util");
const router = express.Router();
// GET route to render login page
router.get("/login", (req, res) => {
  res.render("login", {
    layout: "layout/layout-without-nav",
    // message: req.flash("message"),
    // error: req.flash("error"),
    user: req.user, // Pass authenticated user to the view
  });
});

// POST route to handle user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    
    // If user is found and credentials are correct
    const token = jwt.sign({ _id: user._id }, "your_jwt_secret", {
      expiresIn: "1h", // Example expiry time
    });
    
    req.user = user; // Set req.user to the authenticated user
    
    res.json({
      user:user
    })
    // Render the login page with authenticated user data
    // res.render("login", {
    //   layout: "layout/layout-without-nav",
    //   // message: req.flash("message"),
    //   // error: req.flash("error"),
    //   user: req.user,
    // });

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Unable to login" });
  }
});


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ error: "Email already exists" });
    }
    // console.log(req.body);
    const user = new User({ name, email, password });
    console.log(req.body);
    console.log(await user.save());
    // console.log(user);
    // await user.save();
    res.status(201).send({ user });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(400).send({ error: "Registration failed" });
  }
});


// Login user
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByCredentials(email, password);
//     const token = jwt.sign({ _id: user._id }, "your_jwt_secret", {
//       expiresIn: "1h", // Example expiry time
//     });
//     res.send({ user, token });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Unable to login" });
//   }
// });

// Logout user
// router.post("/logout", auth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter(
//       (token) => token.token !== req.token
//     );
//     await req.user.save();
//     res.send();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.get("/:id", auth,userController.getUserById);
module.exports = router;
