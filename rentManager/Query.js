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
    this._filters.push(filter);
  
    return this;
  },

  embed(name) {
    if (this.allowedEmbeds && !this.allowedEmbeds.includes(name)) throw new Error(`Embed '${name}' is not allowed`);
    
    if (isString(name)) {
      if (!this._embeds.includes(name)) this._embeds.push(name);
    } else if (Array.isArray(name)) {
      this._embeds = name
    } else {
      throw new Error('Error adding fields to query, expected string or array')
    }

    return this;
  },

  field(fld) {
    if (isString(fld)) {
      if (!this._fields.includes(fld)) this._fields.push(fld);
    } else if (Array.isArray(fld)) {
      this._fields = fld
    } else {
      throw new Error('Error adding fields to query, expected string or array')
    }

    return this;
  },

  pageSize(size) {
    this._pageSize = size;
    return this;
  },

  pageNumber(num) {
    this._pageNumber = num;
    return this;
  },

  exec() {
    const url = this._makeUrl();
    
    return this.base.get(url);
  },

  _makeUrl() {
    let qs = []
    if (this._filters && this._filters.length) {
      qs.push(`filters=${this._filters.join(';')}` )
    }

    if (this._embeds && this._embeds.length) {
      qs.push(`embeds=${this._embeds.join(',')}`)
    }

    if (this._fields && this._fields.length) {
      qs.push(`fields=${this._fields.join(',')}`)
    }

    if (this._pageSize) qs.push(`pageSize=${this._pageSize}`)
    if (this._pageNumber) qs.push(`pageNumber=${this._pageNumber}`)

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
    _pageSize: null,
    _pageNumber: null,
    _fields: [],
    _filters: [],
    _embeds: [],
  };
  
  options = pick(options, Object.keys(defaults));
  Object.assign(query, defaults, options, props )

  return query
}