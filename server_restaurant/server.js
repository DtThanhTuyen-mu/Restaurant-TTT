const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();

// Ket noi den mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb "))
  .catch((err) => console.log("Could not connect to database" + err));

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//
app.get("/", (req, res) => {
  res.send("This is home page");
});


// Import cac routes
const lobby = require('./routes/lobbyRoutes');
const table = require('./routes/tableRoutes')

app.use("/api", lobby);
app.use("/api", table);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
