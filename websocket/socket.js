const WebSocket = require("ws");
const webSocketClients = {};

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", (ws, req) => {
    const userId = req.url.split("=")[1];
    webSocketClients[userId] = ws;

    ws.on("close", () => delete webSocketClients[userId]);
  });

  global.sendEarningNotification = (userId, data) => {
    const ws = webSocketClients[userId];
    if (ws) {
      ws.send(JSON.stringify({ type: "earning", data }));
    }
  };
};
