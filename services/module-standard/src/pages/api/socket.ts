import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

const SocketHandler = async (req: NextApiRequest, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');

    const io = new Server(res.socket.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', socket => {
      console.log(`Client ${socket.id} connected`);

      // Join a conversation
      const { roomId } = socket.handshake.query;
      socket.join(roomId);

      // Listen for new messages
      socket.on('', (data: any) => {
        io.in(roomId).emit('', data);
      });

      // Leave the room if the user closes the socket
      socket.on('disconnect', () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
