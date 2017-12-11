const isString = require('lodash/isString');
const isNil = require('lodash/isNil');
const pick = require('lodash/pick');

const operations = {
  eq: "EqualTo",
  ne: "NotEqualTo",
  in: "In",
  ni: "NotIn",
  ct: "Contains",
  sw: "StartsWith",
  ew: "EndsWith",
  lt: "LessThan",
  le: "LessThanOrEqualTo",
  gt: "GreaterThan",
  ge: "GreaterThanOrEqualTo",
  bt: "Between",
  gtn: "GreaterThanOrNull",
  gen: "GreaterThanOrEqualToOrNull",
  ltn: "LessThanOrNull",
  len: "LessThanOrEqualToOrNull",
  hv: "HasValue",
}

const ALLOWED_OPS = Object.keys(operations);
const unique = (item, idx, coll) => idx === col.indexOf(item);


const Query = {
  filter(prop, op, val) {
    const filter = this._makeFilter(prop, op, val);
    this.filters.push(filter);
  
    return this;
  },

  embed(name) {
    if (this.allowedEmbeds && !this.allowedEmbeds.includes(name)) throw new Error(`Embed '${name}' is not allowed`);
    
    if (isString(name)) {
      if (!this.embeds.includes(name)) this.embeds.push(name);
    } else if (Array.isArray(name)) {
      this.embeds = name
    } else {
      throw new Error('Error adding fields to query, expected string or array')
    }

    return this;
  },

  field(fld) {
    if (isString(fld)) {
      if (!this.fields.includes(fld)) this.fields.push(fld);
    } else if (Array.isArray(fld)) {
      this.fields = fld
    } else {
      throw new Error('Error adding fields to query, expected string or array')
    }

    return this;
  },

  pageSize(size) {
    this.pageSize = size;
    return this;
  },

  pageNumber(num) {
    this.pageNumber = num;
    return this;
  },

  exec() {
    const url = this._makeUrl();
    
    return this.base.get(url);
  },

  _makeUrl() {
    let qs = []
    if (this.filters && this.filters.length) {
      qs.push(`filters=${this.filters.join(';')}` )
    }

    if (this.embeds && this.embeds.length) {
      qs.push(`embeds=${this.embeds.join(',')}`)
    }

    if (this.fields && this.fields.length) {
      qs.push(`fields=${this.fields.join(',')}`)
    }

    if (this.pageSize) qs.push(`pageSize=${this.pageSize}`)
    if (this.pageNumber) qs.push(`pageNumber=${this.pageNumber}`)

    qs = (qs) ? '?' + qs.join('&') : '';

    return this.url + qs;
  },

  _makeFilter(prop, op, val) {
    if (!isString(prop)) throw new Error(`'prop' must be a string`)
    if (!ALLOWED_OPS.includes(op)) throw new Error(`'op' is not an allowed operation (received '${op}')`)
    if (isNil(val)) throw new Error (`Expected non null/undefined for 'value`)
  
    return [prop, op, encodeURIComponent(val)].join(',');
  }
}


module.exports = (options) => {
  const requiredOptions = ['url', 'base'];
  const missing = requiredOptions.filter(opt => !options.hasOwnProperty(opt));
  if (missing.length) throw new Error(`Query is missing required options '${missing.join(',')}'`)

  const query = Object.create(Query);

  const defaults = {
    url: '',
    base: null,
    allowedEmbeds: null,
    defaultEmbeds: [],
  };

  const props = {
    pageSize: null,
    pageNumber: null,
    fields: [],
    filters: [],
    embeds: [],
  };
  
  options = pick(options, Object.keys(defaults));
  Object.assign(query, defaults, options, props )

  return query
}