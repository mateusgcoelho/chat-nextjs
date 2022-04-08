import { randomUUID } from 'crypto';
import { Server } from 'Socket.IO'

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    let messages: Array<any> = [];  

    io.on('connection', (socket) => {
      socket.emit('previousMessage', messages);
    
      socket.on('sendMessage', data => {
        if (data.content != ""){
          messages.push(data);
        }
        io.emit('receivedMessage', messages);
      });
    });
  }
  res.end()
}

export default SocketHandler