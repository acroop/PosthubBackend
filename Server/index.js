
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`USER CONNECTED ${socket.id}`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('send_message', (data) => {
    console.log('message: ' + data);
    socket.broadcast.emit("received_message", data);
  });
});

server.listen(5174, () => {
  console.log('listening on *:5174');
});

