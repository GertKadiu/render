const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
app.use(express.static("uploads"));
require("dotenv").config();

app.use(
  cors()
);

app.use(express.json());

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "10mb" })); 
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" })); 

const UserRoute = require("./Routes/Users");
const PostRoute = require("./Routes/Post");

app.use("/", UserRoute);
app.use("/", PostRoute);

app.use(express.static(path.join(__dirname + "public")))


const mongoURI = process.env.MONGO_URI 
const port = process.env.PORT;


// || MONGO_URI_LOCALLY;


mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
