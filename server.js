/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

/* var bGround = require("fcc-express-bground");
var myApp = require("./myApp");
var express = require("express");
var app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use(function (req, res, next) {
    var allowedOrigins = [
      "https://narrow-plane.gomix.me",
      "https://www.freecodecamp.com",
    ];
    var origin = req.headers.origin || "*";
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(origin);
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }
    next();
  });
}

var port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function () {
  bGround.log("Node is listening on port " + port + "...");
});
 */
/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/
const { createServer } = require("http");
const app = require("./app");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
    default:
      throw error;
  }
};

const server = createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  let bind;
  if (typeof address === "string") {
    bind = "pipe " + address;
  } else if (address.family === "IPv6") {
    bind = "http://localhost:" + port;
  }
  console.log(`\x1b[42m 🚀 API Server start listening on: ${bind}\x1b[40m\n`);
});

server.listen(port);
