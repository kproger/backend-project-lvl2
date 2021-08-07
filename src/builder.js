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

  return { type: 'root', 
    children: _.union(_.keys(obj1), _.keys(obj2)).map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
        return {key,  value: value2, type: 'added'};
    } else if (!_.has(obj2, key)) {
        return {key, value: value1, type: 'deleted'};
    } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return {key, type: 'nested', children: buildTree(value1, value2)};
    } else if (!_.isEqual(obj1, obj2)) {
        return {key, value: value2, type: 'changed'}
    } 
    return {key, value: value2, type: 'unchanged'};
  })
  } 
};
export {buildTree};
export default buildTree(f1, f2);