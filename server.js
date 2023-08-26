const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/db");
require("dotenv").config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Wellcome to Social Media App's Server");
});

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
