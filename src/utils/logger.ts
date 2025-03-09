export class Logger {
  // todo: add log levels, upload logs to the database, etc
  // todo: add a timestamp to the logs
  // todo: add logger for each guild and save logs to the databse
  // todo: add logger for the whole bot, with all the data, and save them to the dabase so it can be read from the main website
  static log(message: string) {
    console.log(`[LOG] ${message}`);
  }

  static error(message: string) {
    console.error(`[ERROR] ${message}`);
  }

  static debug(message: string) {
    process.env.NODE_ENV === "development" && console.log(`[DEBUG] ${message}`);
  }
}
