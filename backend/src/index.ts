import dotenv from "dotenv";
import express, { Application, Router } from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";

import Socket from "./Core/Services/Socket";
import { config as appConfig } from "./Config";
import routes from "./Routes";
import { execute } from "./Core";

dotenv.config();

const app: Application = express();
const router: Router = Router();
const config = appConfig[process.env.NODE_ENV];
const io = Socket();

const server: http.Server = http.createServer(app);
io.connect(server);

app.use(logger(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

if (process.env.NODE_ENV === "production") {
  console.log("IMPLEMENT...");
} else {
  app.use("/api", routes(router));
}

io.getSocket().on("connection", socket => {
  execute(socket);
});

server.listen(config.port, () => {
  console.log(`Server listening on ${config.url}:${config.port}`);
});
