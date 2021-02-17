import io from "socket.io-client";

export class SocketService {
  private socket: SocketIOClient.Socket | null = null;

  connect = () => {
    return io("http://127.0.0.1:3000");
  };

  disconnect = () => {
    this.socket?.disconnect();
  };

  getSocket = () => {
    return this.socket;
  };
}

export default new SocketService();
