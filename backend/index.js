require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// db build
const db=require("./models/db")

// router build
const userRouter = require("./routes/user")
const roleRouter = require("./routes/role")
const capaginRouter = require("./routes/campaign")
// port # run on it
const PORT = process.env.PORT || 5000;

// Handles any other endpoints [endpoints]
app.use("/user",userRouter);

app.use("/role",roleRouter)

app.use("/campaign",capaginRouter)


// Undefiend end point

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
