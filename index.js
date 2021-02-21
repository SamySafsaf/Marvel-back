const express = require("express");
const formidable = require("express-formidable");
const axios = require("axios");
// const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

// mongoose.connect("mongodb://localhost/marvel-app", {
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

//import routes
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);
const characterInComics = require("./routes/characterInComics");
app.use(characterInComics);
const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
