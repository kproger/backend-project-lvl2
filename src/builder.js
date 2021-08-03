import _ from 'lodash';

const f1 = {
    "common": {
      "setting1": "Value 1",
      "setting2": 200,
      "setting3": true,
      "setting6": {
        "key": "value",
        "doge": {
          "wow": ""
        }
      }
    },
    "group1": {
      "baz": "bas",
      "foo": "bar",
      "nest": {
        "key": "value"
      }
    },
    "group2": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  };

  const f2 = {
    "common": {
        "follow": false,
        "setting1": "Value 1",
        "setting3": null,
        "setting4": "blah blah",
        "setting5": {
        "key5": "value5"
        },
        "setting6": {
        "key": "value",
        "ops": "vops",
        "doge": {
            "wow": "so much"
        }
        }
    },
    "group1": {
        "foo": "bar",
        "baz": "bars",
        "nest": "str"
    },
    "group3": {
        "deep": {
        "id": {
            "number": 45
        }
        },
        "fee": 100500
    }
};

const buildTree = (obj1, obj2) => {

  const result = _.union(_.keys(obj1), _.keys(obj2)).reduce((acc, key) => {
    const val1 = obj1[key];
    const value = obj2[key];
    if (!_.has(obj1, key)) {
        return {acc, key,  value, type: 'added'};
    } else if (!_.has(obj2, key)) {
        return {acc, key, val1, type: 'deleted'};
    } else if (_.isPlainObject(val1) && _.isPlainObject(value)) {
        return {acc, key, value, type: 'nested', children: buildTree(val1, value)};
    } else if (!_.isEqual(obj1, obj2)) {
        return {acc, key, value, type: 'changed'}
    } 
    return {acc, key, value, type: 'unchanged'};
  }, );

  return result;
};

console.log(buildTree(f1, f2));