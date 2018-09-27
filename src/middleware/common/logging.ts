const { createLogger, format, transports } = require('winston')
const { combine, timestamp, colorize, prettyPrint } = format

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint(), colorize()),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
})

const env = 'development'

// Development Logger
if (env === 'development') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  )
}

process.on('unhandledRejection', function(reason, p) {
  logger.warn(
    'system level exceptions at, Possibly Unhandled Rejection at: Promise ',
    p,
    ' reason: ',
    reason
  )
})
