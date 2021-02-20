import { Server, ServerOptions } from "socket.io";
import * as http from "http";
import { Events } from "../../App/Events";
let io: Server = null;

export interface ISocketService {
  connect: (server: http.Server, opts?: ServerOptions) => void;
  emit: (event: Events, values: any) => void;
  getSocket: () => Server | null;
  setSocket: (newSocket: Server) => void;
}

export default (): ISocketService => ({
  connect: function (server: http.Server, opts?: ServerOptions) {
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
  },
  emit: function (event: Events, values: any) {
    if (io) {
      io.sockets.emit(event, values);
      return;
    }
  },
  getSocket: (): Server | null => io,
  setSocket: (newSocket: Server) => (io = newSocket),
});
