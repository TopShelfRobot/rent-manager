const program = require('commander')
const colors = require('colors');
require('dotenv').config()

const RentManagerApi = require('./rentManager')

program
  .option('-f, --filename <filename>', 'csv filename to batch update')
  .parse(process.argv)

console.log("THE BATCHER", program.filename)