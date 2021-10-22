const computeObjects = function computeObjects(objects, func) {
    if (objects === undefined) throw 'No input specified';
    if (!Array.isArray(objects)) throw 'Input must be an array';
    if (objects.length === 0) throw 'Input array is empty';
    if (typeof func !== 'function') throw 'Second parameter must be a function';

    objects.forEach((elem) => {
        if (typeof elem !== 'object') throw 'Elements must be objects';
        if (Object.keys(elem).length === 0) throw 'Objects cannot be empty';
        Object.values(elem).forEach((value) => {
            if (typeof value !== 'number') throw 'All values must be numbers';
        });
    });

    let result = {};
    objects.forEach((obj) => {
        Object.keys(obj).forEach((k) => {
            if (result[k] !== undefined) {
                result[k] += func(obj[k]);
            } else {
                result[k] = func(obj[k]);
            }
        });
    });

    return result;
};

const commonKeys = function commonKeys(obj1, obj2) {
    if (obj1 === undefined || obj2 === undefined) throw 'No input specified';
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') throw 'Input must be objects';

    let result = {};
    Object.keys(obj1).forEach((key1) => {
        if (typeof obj1[key1] === 'object' && typeof obj2[key1] === 'object') {
            const common = commonKeys(obj1[key1], obj2[key1]);
            if (Object.keys(common).length !== 0) result[key1] = common;
        } else {
            if (obj2[key1] === obj1[key1]) {
                result[key1] = obj2[key1];
            }
        }
    });

    return result;
};

const flipObject = function flipObject(object) {
    if (typeof object !== 'object') throw 'Elements must be objects';
    if (Object.keys(object).length === 0) throw 'Objects cannot be empty';

    let result = {};
    Object.keys(object).forEach((key) => {
        if (Array.isArray(object[key])) {
            object[key].forEach((elem) => {
                result[elem] = key;
            });
        } else if (typeof object[key] === 'object') {
            result[key] = flipObject(object[key]);
        } else {
            result[object[key]] = key;
        }
    });
    return result;
};

module.exports = {
    computeObjects,
    commonKeys,
    flipObject,
};
