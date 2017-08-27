'use strict'

/*
  More modularized app startup approach.
  Follows pattern observed in juke workshop app.
  I like it a bit better than the start file we
  were provided

  OAR - 08/25/2017
*/
const chalk = require('chalk')
const startDb = require('./db')

/*
    Create a node server instance.
*/
const server = require('http').createServer()

/*
    Instantiate express app and attach to http server.
*/
const createApplication = function () {
    var app = require('./app')
    server.on('request', app)
}

/*
    Start server to listen on specified port.
*/
const startServer = function () {

    const PORT = process.env.PORT || 1337

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)))
    })

}

/*
    Execute application startup sequence.
*/
startDb
.then(createApplication)
.then(() => {
  if (module === require.main) {
    startServer()
  }
})
.catch(function (err) {
    console.error(chalk.red(err.stack))
    process.exit(1)
})
