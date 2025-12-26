import log4js from "log4js";

log4js.configure({
  appenders: {
    out: { type: "stdout", layout: { type: "pattern", pattern: "%[ %d{dd.MM.yyyy hh:mm:ss} | %p | %m %]" } },
  },
  categories: {
    default: {
      appenders: ["out"],
      level: "all",
    },
  },
});

export namespace LogService {
  const logger = log4js.getLogger();

  export function logInfo(message: string): void {
    logger.info(message);
  }

  export function logDebug(message: string): void {
    logger.debug(message);
  }

  export function logWarn(message: string): void {
    logger.warn(message);
  }

  export function logError(message: string): void {
    logger.error(message);
  }
}
