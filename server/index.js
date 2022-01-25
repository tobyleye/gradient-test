require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const apiRoutesV1 = require('./routes.v1')

const port = process.env.PORT || 3000;

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI);

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
