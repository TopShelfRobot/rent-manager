const Query = require("../Query");

const PropertyGroups = {
  get() {
    const query = Query({
      base: this.base,
      url: this.basePath
    });

    Object.assign(query, {});

    return query;
  },
  find(...args) {
    return this.get(...args);
  }
};

module.exports = base => {
  const uTypes = Object.create(PropertyGroups);

  uTypes.base = base;
  uTypes.basePath = "/PropertyGroups";

  return uTypes;
};
