const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
const bodyParser = require("body-parser");
const ejsLayouts = require('express-ejs-layouts');

// Import routes
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categories");
const shareMeetRoutes = require("./routes/sharemeets");
const communityRoutes = require("./routes/communities");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/sharemeet");

app.use(bodyParser.json());
// Set EJS as the view engine
app.set("view engine", "ejs");
// Use express-ejs-layouts middleware
app.use(ejsLayouts);

// Specify the directory where EJS files are located (optional, defaults to 'views')
app.set("views", path.join(__dirname, "views"));

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sharemeets", shareMeetRoutes);
app.use("/api/communities", communityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
