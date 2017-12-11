const Statuses = require('./Statuses');
const Categories = require('./Categories');

const ServiceManager = {};

module.exports = base => {
  const serviceManager = Object.create(ServiceManager)

  serviceManager.base = base;
  serviceManager.Statuses = Statuses(base);
  serviceManager.Categories = Categories(base);

  return serviceManager
}