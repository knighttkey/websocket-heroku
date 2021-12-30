const express = require("express");
// console.log('express', express)
const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const app = express().use("*", cors());
app.use(express.json());
const SocketServer = require("ws").Server;

const PORT = 3400;
// const PORT = process.env.PORT || 3400;
const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

// const server = http.createServer((req, res) => {
//   if (req.url == '/') {
//       res.writeHead(200, {
//           'Context-Type': 'text/html'
//       });
//       res.write('<h1>WebSocket test!!</h1>');
//       res.end();
//   } else {
//       res.writeHead(200, {
//           'Context-Type': 'text/html'
//       });
//       res.write('<h1>404</h1>');
//       res.end();
//   }
// }).listen(PORT, () => console.log(`Listening on ${PORT}`))

const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // const sendNowTime = setInterval(() => {
    // ws.send(String(new Date()));
  // }, 1000);

  ws.on("message", (data) => {
    // console.log('data', data)

    let bufferToString = data.toString("utf8");

    console.log('bufferToString', bufferToString)
    // ws.send(data);
            let clients = wss.clients;

            clients.forEach(client => {
                // client.send(String(data));
                client.send(bufferToString);
            })
  });

  ws.on("close", () => {
    // clearInterval(sendNowTime);
    console.log("Close connected");
  });
});

// const nodeServer = http.createServer(app);

// nodeServer.listen(3400, () => {
//   console.log("server running at " + 3400);
// });

// app.listen(3001, () => {
//   console.log("Server Listening on port 3001");
// });

module.exports = app;
