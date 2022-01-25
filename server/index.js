const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const apiRoutesV1 = require('./routes.v1')

const port = 3000;

async function startServer() {
  await mongoose.connect("mongodb://localhost:27017/gradient-test");

  const app = express();
  app.use(express.json());
  app.use(cors())

  // register router
  app.use('/api/v1', apiRoutesV1)

  app.listen(port, () => {
    console.log("app is listening on port " + port);
  });

  return app;
}

startServer();
