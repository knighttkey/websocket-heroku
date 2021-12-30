const express = require("express");
// console.log('express', express)
const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const app = express().use("*", cors());
app.use(express.json());
// const SocketServer = require("ws").Server;
const expressWs = require('express-ws')(app);
const INDEX = '/index.html';
const PORT = 5400;
// const PORT = process.env.PORT || 3400;
// const server = express().listen(PORT, () =>
//   console.log(`Listening on ${PORT}`)
// );

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const wss = new SocketServer({ server });

app.ws("/", (ws) => {
  console.log("Client connected");

  // const sendNowTime = setInterval(() => {
    ws.send(String(new Date()));
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

// app.get("/fetch_preview", async (req, res) => {
//   let url = req.headers.url;
//   console.log("url", url);

//   let result;
//   urlMetadata(url, {})
//     .then(async (metadata) => {
//       // console.log("urlMetadata_metadata", metadata);
//       res.send(metadata);
//     })
//     .catch((error) => {
//       console.log("urlMetadata_error", error);
//       res.status(503).end();
//     });
// });

app.get("/", async (req, res) => {
  console.log('res', res)
  console.log('req', req)
  res.send("connecting")

});
// const nodeServer = http.createServer(app);

// nodeServer.listen(3400, () => {
//   console.log("server running at " + 3400);
// });

// app.listen(3001, () => {
//   console.log("Server Listening on port 3001");
// });

module.exports = app;
