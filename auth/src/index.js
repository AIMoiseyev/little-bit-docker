const express = require("express");
const { connectDb } = require("./helpers/db");
const axios = require("axios");
const { host, port, db, apiUrl } = require("./configuration");
const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on port: ${port}`);
    console.log(`on host ${host}`);
    console.log(`Our database is ${db}`);
  });
};

app.get("/test", (req, res) => {
  res.send("Our auth server is working correctly");
});

app.get("/testwithapidata", (req, res) => {
  axios.get(apiUrl + "/testapidata").then((response) => {
    res.json({
      testApiData: response.data.testWithApi,
    });
  });
});

app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "1234",
    email: "foo@gmail.com",
  });
});

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
