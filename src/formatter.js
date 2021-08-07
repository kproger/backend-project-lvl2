import _ from 'lodash';
import buildTree from './builder.js';
import data from './builder.js';

const format = (obj) => {
    
    if (obj.type === 'added') {
        return {[`+${obj.key}`]: obj.value};
    } else if (obj.type === 'deleted') {
        return {[`-${obj.key}`]: obj.value};
    } else if (obj.type === 'nested') {
        return {[` ${obj.key}`]: format(obj.children)};
    } else if (obj.type === 'changed') {
        return {[`+${obj.key}`]: format(obj.value)};
    } else if (obj.type === 'unchanged') {
        return {[` ${obj.key}`]: obj.value};
    } else if (obj.type === 'root') {
        return obj.children.forEach(format);
    }
}
console.log(format(data))