import io from "socket.io-client";
import { API } from "../../constants";

export class SocketService {
  private socket: SocketIOClient.Socket | null = null;

  connect = () => {
    console.log("Socket URL: ", API.SOCKET[process.env.NODE_ENV]);
    return io(API.SOCKET[process.env.NODE_ENV]);
  };

  disconnect = () => {
    this.socket?.disconnect();
  };

  getSocket = () => {
    return this.socket;
  };
}

export default new SocketService();
