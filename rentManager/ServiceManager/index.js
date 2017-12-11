const Statuses = require('./Statuses');
const Categories = require('./Categories');
const Issues = require('./Issues');

const ServiceManager = {};

module.exports = base => {
  const serviceManager = Object.create(ServiceManager)

  serviceManager.base = base;
  serviceManager.Statuses = Statuses(base);
  serviceManager.Categories = Categories(base);
  serviceManager.Issues = Issues(base);

  return serviceManager
}