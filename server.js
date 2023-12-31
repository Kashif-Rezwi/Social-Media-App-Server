const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { auth } = require("./middlewares/auth.middleware");
const { postRouter } = require("./routes/post.route");
const { loginRouter } = require("./routes/login.route");
const { analyticsRouter } = require("./routes/analytics.router");
require("dotenv").config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Wellcome to Social Media App's Server");
});

server.use(auth);
server.use("/users", userRouter);
server.use("/login", loginRouter);
server.use("/posts", postRouter);
server.use("/analytics", analyticsRouter);

sequelize
  .sync()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log({
        Status: `Connected to database at port ${process.env.PORT}`,
      });
    });
    console.log({ Status: "Database synchronized" });
  })
  .catch((error) => {
    console.log({ Status: "Error syncing database:", error });
  });
