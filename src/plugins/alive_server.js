const express = require('express')
const app = express()
const logger = require("./logger")
const config = require("./config")

const port = config.all.bot.ALIVE_SERVER_PORT

app.use(require('express-status-monitor')({
  title: 'Dreamvast Realtime Status',  // Default title
  path: '/',
  chartVisibility: {
  cpu: true,
  mem: true,
  load: false,
  eventLoop: false,
  heap: true,
  responseTime: false,
  rps: false,
  statusCodes: false
},
}));

app.listen(port)

logger.info(`Running alive server in port: ${port}`)