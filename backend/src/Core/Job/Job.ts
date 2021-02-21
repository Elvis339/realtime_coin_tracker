import { join } from "path";
import { exec } from "child_process";
import { Socket } from "socket.io";
import cron from "node-cron";

import { Events } from "../../App/Events";
import Log from "../Services/Log";
import { Utils } from "../../Utils/Utils";

const asyncJob = () => {
  return new Promise((resolve, reject) => {
    let path = "";
    if (process.env.NODE_ENV === "development") {
      path = join(Utils.getRootPath(), "Scripts", "fetchCoinsCurl");
    } else {
      path = __dirname.split("build")[0];
    }
    const abs_path = join(path, "Scripts", "fetchCoinsCurl");
    exec(abs_path, (error, stdout, stderr) => {
      if (error !== null) {
        return reject(error);
      }

      return resolve(JSON.parse(stdout));
    });
  });
};

export const execute = (socket: Socket): void => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const data = await asyncJob();
      socket.emit(Events.updateCoins, data);
      Log.logEvent(Events.updateCoins, "Success");
    } catch (error) {
      Log.log(error.message);
    }
  });
};
