"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slice = exports.reverse = exports.remove = exports.pullAt = exports.pullAllWith = exports.pullAllBy = exports.pullAll = exports.pull = exports.concat = exports.compact = exports.chunk = exports.fromPairs = exports.unzipWith = exports.unzip = exports.zipObjectDeep = exports.zipObject = exports.zip = exports.differenceWith = exports.differenceBy = exports.difference = exports.intersectionWith = exports.intersectionBy = exports.intersection = exports.unionWith = exports.unionBy = exports.union = exports.uniqWithDeep = exports.uniqByDeep = exports.uniqWith = exports.uniqBy = exports.flattenDepth = exports.debounce = exports.flattenDeep = exports.flatten = exports.uniq = exports.mapValues = exports.maxBy = exports.isPlainObject = exports.isRegExp = exports.isDate = exports.isBoolean = exports.isNumber = exports.isString = exports.isArray = exports.isObject = exports.isFunction = exports.isNil = exports.isEmpty = exports.pick = exports.omit = void 0;
exports.mean = exports.mode = exports.startCase = exports.isEqualWith = exports.isEqual = exports.cloneDeep = exports.clone = exports.set = exports.get = exports.findLast = exports.find = exports.merge = exports.takeWhileDeep = exports.takeRightWhileDeep = exports.sortedUniqByDeep = exports.sortedLastIndexByDeep = exports.sortedIndexByDeep = exports.differenceWithDeep = exports.differenceByDeep = exports.intersectionWithDeep = exports.intersectionByDeep = exports.unionWithDeep = exports.unionByDeep = exports.takeWhile = exports.takeRightWhile = exports.takeRight = exports.take = exports.tail = exports.sortedUniqBy = exports.sortedUniq = exports.sortedLastIndexOf = exports.sortedLastIndexBy = exports.sortedLastIndex = exports.sortedIndexOf = exports.sortedIndexBy = exports.sortedIndex = void 0;
const _ = require('lodash');
exports.omit = _.omit;
exports.pick = _.pick;
exports.isEmpty = _.isEmpty;
exports.isNil = _.isNil;
exports.isFunction = _.isFunction;
exports.isObject = _.isObject;
exports.isArray = _.isArray;
exports.isString = _.isString;
exports.isNumber = _.isNumber;
exports.isBoolean = _.isBoolean;
exports.isDate = _.isDate;
exports.isRegExp = _.isRegExp;
exports.isPlainObject = _.isPlainObject;
exports.maxBy = _.maxBy;
exports.mapValues = _.mapValues;
exports.uniq = _.uniq;
exports.flatten = _.flatten;
exports.flattenDeep = _.flattenDeep;
exports.debounce = _.debounce;
exports.flattenDepth = _.flattenDepth;
exports.uniqBy = _.uniqBy;
exports.uniqWith = _.uniqWith;
exports.uniqByDeep = _.uniqBy;
exports.uniqWithDeep = _.uniqWith;
exports.union = _.union;
exports.unionBy = _.unionBy;
exports.unionWith = _.unionWith;
exports.intersection = _.intersection;
exports.intersectionBy = _.intersectionBy;
exports.intersectionWith = _.intersectionWith;
exports.difference = _.difference;
exports.differenceBy = _.differenceBy;
exports.differenceWith = _.differenceWith;
exports.zip = _.zip;
exports.zipObject = _.zipObject;
exports.zipObjectDeep = _.zipObject;
exports.unzip = _.unzip;
exports.unzipWith = _.unzipWith;
exports.fromPairs = _.fromPairs;
exports.chunk = _.chunk;
exports.compact = _.compact;
exports.concat = _.concat;
exports.pull = _.pull;
exports.pullAll = _.pullAll;
exports.pullAllBy = _.pullAllBy;
exports.pullAllWith = _.pullAllWith;
exports.pullAt = _.pullAt;
exports.remove = _.remove;
exports.reverse = _.reverse;
exports.slice = _.slice;
exports.sortedIndex = _.sortedIndex;
exports.sortedIndexBy = _.sortedIndexBy;
exports.sortedIndexOf = _.sortedIndexOf;
exports.sortedLastIndex = _.sortedLastIndex;
exports.sortedLastIndexBy = _.sortedLastIndexBy;
exports.sortedLastIndexOf = _.sortedLastIndexOf;
exports.sortedUniq = _.sortedUniq;
exports.sortedUniqBy = _.sortedUniqBy;
exports.tail = _.tail;
exports.take = _.take;
exports.takeRight = _.takeRight;
exports.takeRightWhile = _.takeRightWhile;
exports.takeWhile = _.takeWhile;
exports.unionByDeep = _.unionBy;
exports.unionWithDeep = _.unionWith;
exports.intersectionByDeep = _.intersectionBy;
exports.intersectionWithDeep = _.intersectionWith;
exports.differenceByDeep = _.differenceBy;
exports.differenceWithDeep = _.differenceWith;
exports.sortedIndexByDeep = _.sortedIndexBy;
exports.sortedLastIndexByDeep = _.sortedLastIndexBy;
exports.sortedUniqByDeep = _.sortedUniqBy;
exports.takeRightWhileDeep = _.takeRightWhile;
exports.takeWhileDeep = _.takeWhile;
exports.merge = _.merge;
exports.find = _.find;
exports.findLast = _.findLast;
exports.get = _.get;
exports.set = _.set;
exports.clone = _.clone;
exports.cloneDeep = _.cloneDeep;
exports.isEqual = _.isEqual;
exports.isEqualWith = _.isEqualWith;
exports.startCase = _.startCase;
const mode = (arr) => {
    if (arr.length === 0) {
        return undefined;
    }
    const counts = _.countBy(arr);
    const max = _.max(Object.values(counts));
    const maxKey = Object.keys(counts).find((k) => counts[k] === max);
    return maxKey ? maxKey : undefined;
};
exports.mode = mode;
const mean = (arr) => {
    if (arr.length === 0) {
        return undefined;
    }
    let sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum / arr.length;
};
exports.mean = mean;
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["dash"]) {
    console.warn(`Duplicate module dash imported. This can lead to bugs.`);
}
globalStore["dash"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map