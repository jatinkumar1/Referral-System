const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const initSocket = require("./websocket/socket");
const connectDB = require('./config/db')

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);

const startServer = async () => {
  await connectDB(); // connect to MongoDB first

  const server = http.createServer(app);
  initSocket(server);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();