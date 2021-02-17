import React from "react";
import { SocketService } from "../../services";

export const socket = SocketService.connect();
export const SocketContext = React.createContext(socket);
