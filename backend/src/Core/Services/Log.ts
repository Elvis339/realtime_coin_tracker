import { WriteStream, createWriteStream } from "fs";
import { join } from "path";
import rimraf from "rimraf";

import { config } from "../../Config";
import { Utils } from "../../Utils/Utils";
import { Events } from "../../App/Events";

class Log {
  path: string = join(Utils.getRootPath(), "Logs", "dev.txt");
  private stream: WriteStream = createWriteStream(this.path, { flags: "a", autoClose: true, encoding: "utf-8" });
  private shouldLog: boolean = config[process.env.NODE_ENV].debug;

  constructor() {}

  log(data: string) {
    if (this.shouldLog) {
      const date = new Date().toISOString();
      this.stream.write(`LOG - ${date}: ${data} \n`);
    }
  }

  logEvent(event: Events, value?: unknown) {
    if (this.shouldLog) {
      const date = new Date().toISOString();
      this.stream.write(`EVENT - ${date}: ${event} with value of ${value} \n`);
    }
  }

  clear() {
    rimraf(this.path, error => {
      if (error) {
        this.log(error.message);
      }
    });
  }
}

export default new Log();
