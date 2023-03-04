require('dotenv').config()
const express = require("express");
const cors = require("cors");
const db=require("./models/db")
const userRouter = require("./routes/user")
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Handles any other endpoints [endpoints]
app.use("/user",userRouter);

// Undefiend end point

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
