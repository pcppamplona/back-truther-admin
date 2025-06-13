import fs from 'fs'
import path from 'path'
import { createLogger, format, transports } from 'winston'

import { env } from '../env'

const isProduction = env.NODE_ENV === 'production'

const logDir = path.resolve(process.cwd(), env.LOG_DIR)

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

const commonFormats = [
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json({ space: 2 }),
]

export const logger = createLogger({
  level: isProduction ? 'info' : 'debug',
  format: format.combine(...commonFormats),
  defaultMeta: { service: env.SERVICE_LOG_NAME },
  transports: [
    new transports.Console({
      format: isProduction
        ? format.combine(...commonFormats)
        : format.combine(
            format.colorize(),
            format.printf(({ timestamp, level, message, stack, ...rest }) => {
              return `[${timestamp}] ${level}: ${stack || message} ${Object.keys(rest).length ? JSON.stringify(rest) : ''}`
            }),
          ),
    }),
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    }),
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
    new transports.File({
      filename: path.join(logDir, 'http.log'),
      level: 'info',
      format: format.combine(
        format((info) => (info.category === 'http' ? info : false))(),
        ...commonFormats,
      ),
    }),
  ],
})
