// import _ from 'lodash';

const o = {
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

// const stylish = (tree) => {
  
//   const iter = (node, depth) => { 
//     const result = []
//     const tabs = '  ';
//     Object.keys(node).forEach((key) => {

//     if (typeof node[key] === 'object' && node[key] !== null) {
//      return result.push(`${tabs.repeat(depth)}${key}: ${iter(node[key], depth + 1)}`)
//     }
    
//      result.push(`${tabs.repeat(depth)}${key}: ${node[key]}`)
    
//     })

//     return `{\n${result.join('\n')}\n${tabs.repeat(depth)}}`;
//   } 
//   return `${iter(tree, 1).slice(0, -4)}\n}`
// };

// export default stylish;
const stringify = (value, replacer = '  ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    } else if (currentValue == null) {
      return currentValue
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (val === '') {
          return `${currentIndent}${key}:${iter(val, depth + 2)}` // убрал пробел после : в случае если нет значения
        }
        return `${currentIndent}${key}: ${iter(val, depth + 2)}`
    });
        
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stringify;