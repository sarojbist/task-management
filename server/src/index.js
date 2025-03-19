require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


const connectDatabase = require("./Models/db");
const UserRouter = require("./Routes/UserRouter");
const TaskRouter = require("./Routes/TaskRouter");
const { verifyJwt } = require("./Auth/jwtAuth");


//handling user login and register
app.use("/api/v1/users", UserRouter);

// handling tasks
app.use("/api/v1/tasks", verifyJwt, TaskRouter);

app.get("/", (req, res) => {
  res.send("Server is working perfectly...")
})

// connecting db before opening port
connectDatabase().
  then(() => {
    console.log("Connected to Database Successfully");
    // run the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to Database due to", err);
  })