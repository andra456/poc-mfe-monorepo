/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import app from './app'
import http from 'http'
import debug from 'debug'

const log = debug('ts-express-esbuild:server')

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: string) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val // named pipe
  if (port >= 0) return port // port number
  return false
}

const port = normalizePort(process.env.PORT ?? '3004')

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port as number}`

  // handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    console.error(`${bind} requires elevated privileges`)
    process.exit(1)
  } else if (error.code === 'EADDRINUSE') {
    console.error(`${bind} is already in use`)
    process.exit(1)
  } else {
    throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = (server: any) => {
  let bind = 'unknown'
  const addr = server.address()
  if (typeof addr === 'string') {
    bind = `pipe ${addr}`
  } else if (addr) {
    bind = `port ${addr.port}`
  }

  log(`Listening on ${bind}`)
}

// eslint-disable-next-line @typescript-eslint/require-await
const start = async () => {
  app.set('port', port)
  const server = http.createServer(app)
  server.listen(port)
  server.on('error', (error: HttpError) => {
    onError(error)
  })
  server.on('listening', () => {
    onListening(server)
  })
}

start().catch((err) => {
  log(err)
  process.exit(1)
})
