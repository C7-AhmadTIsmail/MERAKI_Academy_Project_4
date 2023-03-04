require('dotenv').config()
const express = require("express");
const cors = require("cors");
const db=require("./models/db")
const userRouter = require("./routes/user")
const app = express();
const PORT = process.env.PORT || 5000;
// console.log(process.env,"env") to test div run

app.use(cors());
app.use(express.json());

// Handles any other endpoints [unassigned - endpoints]
// userRouter.use("/user",)

app.use("/user",userRouter);


app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
