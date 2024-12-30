import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss:ms'
    }),
    // Exclude timestamp from the metadata to avoid duplication in output
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss:ms'
        }),
        format.printf(({ timestamp, level, message, metadata }) => {
          // Check if there's metadata and convert it to string if not empty
          const metaString = (metadata && Object.keys(metadata).length) ? JSON.stringify(metadata) : '';
          return `[${timestamp}] ${level}: ${message} ${metaString}`;
        }),
      ),
    })
  ]
});

if(process.env.NODE_ENV === 'production'){
  logger.add(
    new transports.File({
      dirname: "/app/logs/",
      filename: "log.log",
      format: format.combine(format.json())
    }))
}

export default logger;