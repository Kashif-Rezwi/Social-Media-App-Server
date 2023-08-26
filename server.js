const express = require("express");
const cors = require("cors");
require("dotenv").config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Wellcome to Social Media App's Server");
});

server.listen(process.env.PORT, () => {
  console.log(`Connected to database at port ${process.env.PORT}`);
});
