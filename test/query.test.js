const {assert} = require('chai');
const Query = require('../rentManager/Query');

// mock
const base = {
  setResults(res) {
    this.res = res;
  },

  get(url) {
    return Promise.resolve(this.res || [])
      .then(res => {
        this.res = null;
        return res;
      });
  }
}

describe.only("Query", () => {
  const baseUrl = 'http://www.example.com/';

  it("adds a filter to a url", () => {
    const q = Query({base, url: baseUrl})
    const url = q
      .filter('a', 'eq', 'b')
      .filter('c', 'eq', 'd')
      ._makeUrl()

    assert.equal(url, `${baseUrl}?filters=a,eq,b;c,eq,d`);
  })

  it("adds embeds to the list", () => {
    const q = Query({base, url: baseUrl})
    const url = q
      .embed('e1')
      .embed('e2')
      ._makeUrl();

    assert.equal(url, `${baseUrl}?embeds=e1,e2`);
  });
  
  it("replaces the embeds array", () => {
    const q = Query({base, url: baseUrl})
    const url = q
      .embed('e1')
      .embed('e2')
      ._makeUrl();
  
    assert.equal(url, `${baseUrl}?embeds=e1,e2`);
    
    const url2 = q
      .embed(['e3','e4'])
      ._makeUrl()
    
    assert.equal(url2, `${baseUrl}?embeds=e3,e4`);

  })

  it("can be extended", () => {
    const q = Query({base, url: baseUrl});
    Object.assign(q, {
      filterStrange(key, value) {
        const sub = this._makeFilter('Text', 'eq', key);
        this.filter(`Strange(${sub}).prop`, 'eq', value);

        return this
      }
    });

    const url = q
      .filterStrange('myKey', 'abc')
      ._makeUrl()

    assert.equal(url, `${baseUrl}?filters=Strange(Text,eq,myKey).prop,eq,abc`)
  })
})