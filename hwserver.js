const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    let data = new Date();
    res.end(data);
  }
});

server.listen(9000, console.log("your project is running at 9000!"));
