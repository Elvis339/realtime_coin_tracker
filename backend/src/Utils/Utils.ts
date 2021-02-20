import path from "path";

export class Utils {
  static getRootPath(): string {
    return path.dirname(require.main.filename);
  }
}
