import dotenv from "dotenv";
dotenv.config();

import express, { Application, Router } from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import cron from "node-cron";

import Socket from "./Core/Services/Socket";
import { config as appConfig } from "./Config";
import routes from "./Routes";
import { Events } from "./App/Events";
import { CoinGeckoClient } from "./Core";

const app: Application = express();
const router: Router = Router();
const config = appConfig[process.env.NODE_ENV];
const socket = Socket();

const server: http.Server = http.createServer(app);
socket.connect(server);

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

socket.getSocketInstance().on("connection", socket => {
  // cron.schedule("* * * * *", async () => {
  //   console.log(`Fetching new coins`);
  //   const client = CoinGeckoClient.getClient();
  //   const { data } = await client.get(`coins/markets`, {
  //     params: {
  //       vs_currency: "usd",
  //       ids: "bitcoin,ripple,ethereum",
  //     },
  //   });
  //   socket.emit(Events.updateCoins, data);
  //   console.log(`${Events.updateCoins}: dispatched.`);
  // });
});

server.listen(config.port, () => {
  console.log(`Server listening on ${config.url}:${config.port}`);
});
