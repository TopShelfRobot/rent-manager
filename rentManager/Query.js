const isString = require('lodash/isString');
const isNil = require('lodash/isNil');
const isDate = require('lodash/isDate');
const pick = require('lodash/pick');
const format = require('date-fns/format')


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
    if (!name) return this;
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
    if (!fld) return this;
    
    if (isString(fld)) {
      if (!this._fields.includes(fld)) this._fields.push(fld);
    } else if (Array.isArray(fld)) {
      this._fields = fld
    } else {
      throw new Error('Error adding fields to query, expected string or array')
    }

    return this;
  },

  saveOption(name, val) {
    this._saveOptions[name] = !!val;
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

  param(paramName, paramValue) {
    this._params[paramName] = paramValue;
    return this;
  },

  options(optionProp, value) {
    this._options[optionProp] = value;
    return this;
  },

  data(d) {
    this._data = d;
    return this;
  },

  exec() {
    const url = this._makeUrl();

    if (this.validate && this._data) {
      const results = this.validate(this._data);
      if (results.error) {
        throw results.error;
      }
    }


    switch(this.method.toLowerCase()) {
      case 'post':
        return this.base.post(url, this._data, this._options);
      case 'delete':
        return this.base.delete(url, this._data, this._options);
      default: 
        return this.base.get(url, this._options);
    }
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

    const saveOptions = Object.keys(this._saveOptions).map(key => `${key},${this._saveOptions[key]}`);
    if (saveOptions.length) {
      qs.push(`SaveOptions=${saveOptions.join(';')}`);
    }

    if (this._pageSize) qs.push(`pageSize=${this._pageSize}`)
    if (this._pageNumber) qs.push(`pageNumber=${this._pageNumber}`)

    qs = (qs) ? '?' + qs.join('&') : '';

    const paramRe = /{[^}]+}/g;
    const params = (this.url.match(paramRe) || []).map(m => m.replace(/[{}]/g,""));
    const missingParams = params.filter(p => !(p in this._params));
    if (missingParams.length) {
      throw new Error(`Missing params [${missingParams.join(', ')}] for url ${this.url}.  Use the function 'Query.param(paramName, paramValue)'.`);
    }
    const url = params.reduce((url, p) => url.split(`{${p}}`).join(this._params[p]), this.url);

    return url + qs;
  },

  _makeFilter(prop, op, val) {
    if (!isString(prop)) throw new Error(`'prop' must be a string`)
    if (!ALLOWED_OPS.includes(op)) throw new Error(`'op' is not an allowed operation (received '${op}')`)
    if (isNil(val)) throw new Error (`Expected non null/undefined for 'value`)
  
    if (isDate(val)) val = format(val);
    
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
    method: 'get',
    base: null,
    allowedEmbeds: null,
    defaultEmbeds: [],
    validate: null,
  };

  const props = {
    _pageSize: null,
    _pageNumber: null,
    _fields: [],
    _filters: [],
    _embeds: [],
    _saveOptions: options.saveOptions || {},
    _params: {},
    _data: null,
    _options: {},
    
  };
  
  options = pick(options, Object.keys(defaults));
  Object.assign(query, defaults, options, props )

  return query
}

// Tenants.RecurringCharges.get().param('TenantID', 123).then()
// Tenants.RecurringCharges.post().param('TenantID', 123).data(newCharge).then()