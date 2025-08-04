import winston from 'winston';
import 'winston-daily-rotate-file';

// Added custom colors for different log levels
winston.addColors({
  error: 'red', //0
  warn: 'yellow', //1
  info: 'cyan', //2
  http: 'magenta', //3
  verbose: 'blue', //4
  debug: 'green', //5
  silly: 'magenta' //6
});

const logger = winston.createLogger({
  level: 'debug', // Only log 'debug' level( see color format for log level priority info) and above, helpful for development 
  // in production can be set to 'info' or 'error'
  
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json() // Default JSON format for file transports
  ),
  transports: [
    // Save error logs to error.log file
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error'
    }),
    // Daily rotated logs
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-results.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    // Save all logs to combined.log file
    new winston.transports.File({ 
      filename: 'logs/combined.log'
    }),
  ],
});


// In development, also log to console with enhanced colors and formatting
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'HH:mm:ss'
      }),
      winston.format.colorize({ all: true }),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
        return `${timestamp} [${level}]: ${message} ${metaStr}`;
      })
    )
  }));
}

export default logger;
