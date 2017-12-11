const {assert} = require('chai');
const {makeFilter, makeFilterString} = require('../rentManager/Filter')

describe('Filter', () => {
  describe('makeFilter()', () => {
    it("creates a simple filter", () => {
      const filter = makeFilter({ prop: 'Text', op: 'eq', value: 'House' });
      assert.equal(filter, 'Text,eq,House')
    })

    it("creates a filter with a model", () => {
      const filter = makeFilter({
        model: 'Amenities',
        prop: 'Text',
        op: 'eq',
        value: 'House'
      })

      assert.equal(filter, 'Amenities.Text,eq,House');
    })

    it("creates a filter with a model and two properties", () => {
      const filter = makeFilter({
        model: 'Amenities',
        filters: [
          {prop: 'Text', op: 'eq', value: 'House'},
          {prop: 'Selected', op: 'eq', value: 'true'},
        ]
      });

      assert.equal(filter, 'Amenities(Text,eq,House).Selected,eq,true');
       
    })

    it("disallows filters on models with more than two subfilters", () => {
      const options = {
        model: 'Amenities',
        filters: [
          {prop: 'Text', op: 'eq', value: 'House'},
          {prop: 'Selected', op: 'eq', value: 'true'},
          {prop: 'Something', op: 'eq', value: 'true'},
        ]
      }
      const willThrow = () => makeFilter(options);

      assert.throws(willThrow)
    })
  })

  describe('makeFilterString()', () => {
    it("creates a filter string from an array of filters", () => {
      const filters = [
        {
          model: 'myModelField',
          filters: [
            {prop: 'Text', op: 'eq', value: 'House'},
            {prop: 'Selected', op: 'eq', value: 'true'},
          ]
        },
        {
          prop: 'myField1',
          op: 'eq',
          value: '123'
        },
        {
          prop: 'myField2',
          op: 'eq',
          value: '456'
        },
      ];
      const expected = 'myModelField(Text,eq,House).Selected,eq,true;myField1,eq,123;myField2,eq,456';
      const filterString = makeFilterString(filters)

      assert.equal(filterString, expected)
    })
  })
})