import { Server, ServerOptions } from "socket.io";
import * as http from "http";
let io: Server = null;

export default () => ({
  connect: (server: http.Server, opts?: ServerOptions) => {
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
  },
  emit: (event: string, values: any) => {
    if (io) {
      console.log(`Emitting ${event} - with values of: ${values}`);
      io.sockets.emit(event, values);
      return;
    }
    console.log(`No io instance!`);
  },
  getSocketInstance: (): Server | null => io,
});
