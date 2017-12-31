const path = require('path');

const Endpoint = {
  getUrl() {
    const parent = (this.base) ? this.base.getUrl() : '/';
    return path.join(parent, this.url);
  }

}

const removeParamBracket = s => m.replace(/[{}]/g,"");
const addParamBracket = s => `{${s}}`;
const findParams = url => (url.match(/{[^}]+}/g) || []).map(removeParamBracket);



module.exports = ({
  base, 
  url =''
}) => {
  const ep = Object.create(Endpoint);

  const a = {
    base,
    url,
    params: findParams(url)
  }

}