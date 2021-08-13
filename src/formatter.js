import _ from 'lodash';
import {data} from './builder.js';

const format = (objects) => {
    return objects.map((obj) => {
        if (obj.type === 'added') {
            return {[`+ ${obj.key}`]: obj.value};
        } else if (obj.type === 'deleted') {
            return {[`- ${obj.key}`]: obj.value};
        } else if (obj.type === 'nested') {
            return {[`  ${obj.key}`]: format(obj.children)};
        } else if (obj.type === 'changed') {
            return {[`- ${obj.key}`]: obj.oldValue, [`+ ${obj.key}`]: obj.newValue};
        } else if (obj.type === 'unchanged') {
            return {[`  ${obj.key}`]: obj.value};
        } else if (obj.type === 'root') {
            return obj.children.map((node) => format(node));
        }
    })
};

const formatAst = (ast) => format(ast.children);

export default formatAst;
console.log(formatAst(data))