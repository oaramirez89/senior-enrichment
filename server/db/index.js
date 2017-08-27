'use strict'

/*
  Modularizing application startup by separating
  the different application componets into their
  own initiation and configuration modules.
*/
const chalk = require('chalk')
const db = require('./db')

/*
  Run model files and make all associations for our Sequelize objects.
*/
require('./models')

/*
  Setup sync promise to use in main startup module.
  Preserved the retry logic provided to us in original
  start module.
*/
const syncedDbPromise = db.sync({force: false})

syncedDbPromise.then(ok => console.log('Synced models to db.'))
  .catch(fail => {
    const retries = 0
    const maxRetries = 5
    // Don't do this auto-create nonsense in prod, or
    // if we've retried too many times.
    if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
      console.error(chalk.red(`********** database error ***********`))
      console.error(chalk.red(`    Couldn't connect to ${connectionString}`))
      console.error()
      console.error(chalk.red(fail))
      console.error(chalk.red(`*************************************`))
      return
    }
    // Otherwise, do this autocreate nonsense
    console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
    return new Promise((resolve, reject) =>
      require('child_process').exec(`createdb "${name}"`, resolve)
    ).then(() => sync(true, retries + 1))
  })

module.exports = syncedDbPromise
