#!/usr/bin/env node
const program = require('commander')
const colors = require('colors');
require('dotenv').config()

const RentManagerApi = require('./rentManager')

function getApi() {
  const required = ['RM_USERNAME', 'RM_PASSWORD', 'RM_CLIENTID']
  const missing = required.filter(env => !process.env.hasOwnProperty(env))
  if (missing.length) {
    console.log(colors.red(`Missing environment variables [${missing.join(', ')}]`))
    process.exit(1)
  }

  const username = process.env.RM_USERNAME
  const password = process.env.RM_PASSWORD
  const clientId = process.env.RM_CLIENTID

  const rm = RentManagerApi({username, password, clientId})
  return rm
}



program
  .version('0.1.0')

program
  .command('update []')
  .description('push')
  .action(function(csvPath, cmd, opts){
    console.log('options', this.options);
  });

program
  .command('get <shortName>')
  .description('Get property data from RM')
  .action(async function(shortName) {
    const api = getApi()

    try {
      await api.Authentication.authorizeUser()
      const properties = await api.Properties.findByShortName(shortName)

      console.log(properties)
    } catch (err) {
      console.error("ERR", err)
    }
  })

  program
    .command('batch <filename>', 'Update multipl properties from a csv file')



if (!process.argv.slice(2).length) {
  program.outputHelp(make_red);
}

function make_red(txt) {
  return colors.red(txt); //display the help text in red on the console
}
  
program.parse(process.argv);
  