const checkArray = function checkArray(a, elemType) {
    if (a === undefined) throw 'No input specified';
    if (!Array.isArray(a)) throw 'Input must be an array';
    if (a.length === 0) throw 'Input array is empty';

    const isChar = (elem) => {
        if (typeof elem !== 'string') return false;
        else {
            return (
                //Code to check if string is a letter
                //https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
                elem.length === 1 && elem.toString().toUpperCase() !== elem.toString().toLowerCase()
            );
        }
    };

    const typeCheck = (elem, type) => {
        switch (type) {
            case 'array':
                if (!Array.isArray(elem)) throw 'All elements must be an array';
                break;
            case 'character':
                if (!isChar(elem)) throw 'Elements must be characters';
                break;
            case 'number or character':
                if (!isChar(elem) && typeof elem !== 'number')
                    throw 'Elements must be characters or numbers';
                break;
            default:
                if (typeof elem !== elemType) throw `Elements must be ${elemType}s`;
                break;
        }
    };

    a.forEach((elem) => {
        typeCheck(elem, elemType);
    });
};

const average = function average(arrays) {
    //Error Checking
    checkArray(arrays, 'array');

    let sum = 0;
    let totalElements = 0;
    arrays.forEach((arr) => {
        checkArray(arr, 'number');
        arr.forEach((elem) => {
            sum += elem;
            totalElements++;
        });
    });

    return Math.round(sum / totalElements);
};

const modeSquared = function modeSquared(array) {
    checkArray(array, 'number');

    //Object that will act to count the number of times each element appears because it cannot house duplicates
    let occurencesSet = {};
    array.forEach((num) => {
        if (occurencesSet[num] === undefined) {
            occurencesSet[num] = 1;
        } else {
            occurencesSet[num]++;
        }
    });
    //How to find the max of an array using
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max#getting_the_maximum_element_of_an_array
    let maxFrequency = Object.values(occurencesSet).reduce((a, b) => Math.max(a, b));
    //If all the values only occur once then there is no mode
    if (maxFrequency === 1) return 0;

    let modes = [];
    Object.keys(occurencesSet).forEach((key) => {
        if (occurencesSet[key] === maxFrequency) {
            modes.push(parseInt(key));
        }
    });
    //Sum squares of the modes
    return modes.map((x) => Math.pow(x, 2)).reduce((a, b) => a + b);
};

const medianElement = function medianElement(array) {
    checkArray(array, 'number');

    //Way to create a sorted copy without changing the orignal array using spread syntax
    //https://stackoverflow.com/questions/9592740/how-can-you-sort-an-array-without-mutating-the-original-array
    const arraySorted = [...array].sort();
    const resultObj = {};
    const len = array.length;
    if (len % 2 === 0) {
        const median = (arraySorted[len / 2 - 1] + arraySorted[len / 2]) / 2;
        resultObj[median] = Math.max(
            array.findIndex((val) => val === arraySorted[len / 2]),
            array.findIndex((val) => val === arraySorted[len / 2 - 1])
        );
    } else {
        const median = arraySorted[Math.floor(len / 2)];
        resultObj[median] = array.findIndex((val) => val === median);
    }

    return resultObj;
};
const merge = function merge(arrayOne, arrayTwo) {
    checkArray(arrayOne, 'number or character');
    checkArray(arrayTwo, 'number or character');

    result = arrayOne.concat(arrayTwo);

    result.sort((a, b) => {
        //If both a and b are strings
        if (typeof a === 'string' && typeof b === 'string') {
            if (
                (a === a.toLowerCase() && b === b.toLowerCase()) ||
                (a === a.toUpperCase() && b === b.toUpperCase())
            ) {
                return a.charCodeAt(0) < b.charCodeAt(0) ? -1 : 1;
            }
            //If they are not the same case and a is lower case assume it is less than the rest
            if (a === a.toLowerCase()) {
                return -1;
            }
            //Otherwise assume it is greater ie is uppercase
            return 1;
        } else {
            //if only a or b is a string assume it is less
            if (typeof a === 'string') return -1;
            else if (typeof b === 'string') return 1;
            // If they are numbers sort regularly
            else return a < b ? -1 : 1;
        }
    });

    return result;
};

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge,
};
