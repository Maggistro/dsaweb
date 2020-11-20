import { NextApiRequest, NextApiResponse } from 'next'
import { Server, Socket } from 'socket.io'

type SocketResponse = NextApiResponse & {
    socket: {
        server: Server
    }
}

const ioHandler = (req: NextApiRequest, res: SocketResponse) => {
    debugger;
  if (!res.socket.server) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)

    io.on('connection', socket => {
      socket.broadcast.emit('a user connected')
      socket.on('hello', (msg: string) => {
        socket.emit('hello', 'world!');
      });
    });

    res.socket.server = io;

  } else {
    console.log('socket.io already running');
  }

  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default ioHandler;
