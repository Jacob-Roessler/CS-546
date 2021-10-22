const checkString = function checkString(str) {
    if (str === undefined) throw 'No input specified';
    if (str.length <= 0) throw 'String length must be > 0';
    if (typeof str !== 'string') throw 'Parameter must be of type string';

    if (!str.trim()) throw 'String must contain more than just spaces';
};

const sortString = function sortString(string) {
    checkString(string);

    const isSymbol = (char) => {
        return !(char >= 'a' && char <= 'z') && !(char >= 'A' && char <= 'Z');
    };

    const result = string
        .split('')
        .sort((a, b) => {
            if (!isNaN(a)) a = parseInt(a);
            if (!isNaN(b)) b = parseInt(b);
            //Spaces are lowest priority in sorting
            if (a === ' ') return 1;

            if (typeof a === 'string' && typeof b === 'string') {
                //Not necessary to sort by symbols
                //if (isSymbol(a) && isSymbol(b)) return a.charCodeAt(0) < b.charCodeAt(0) ? -1 : 1;
                //If just a is a symbol
                if (isSymbol(a)) return 1;
                //If just b is a symbol
                else if (isSymbol(b)) return -1;
                else return a.charCodeAt(0) < b.charCodeAt(0) ? -1 : 1;
            }
            if (typeof a === 'string') return -1;
            if (typeof a === 'number' && typeof b === 'number') return a < b ? -1 : 1;
            return 1;
        })
        .join('');
    return result;
};

const replaceChar = function replaceChar(string, idx) {
    checkString(string);
    if (idx === undefined) throw 'No index supplied';
    if (typeof idx !== 'number') throw 'Invalid idx type';
    if (idx <= 0 || idx > string.length - 2) throw 'Index not valid for string';

    const toReplace = string[idx];
    const replacers = [string[idx - 1], string[idx + 1]];
    let turn = 0;
    let result = string;

    //Strings are immutable so must construct a new string for each replacement operation
    const setChar = (s, idx, char) => {
        return s.substring(0, idx) + char + s.substring(idx + 1);
    };

    for (let i = 0; i < string.length; i++) {
        if (result[i] === toReplace && i != idx) {
            result = setChar(result, i, replacers[turn]);
            turn = turn === 0 ? 1 : 0;
        }
    }
    return result;
};

const mashUp = function mashUp(string1, string2, char) {
    checkString(string1);
    checkString(string2);
    checkString(char);
    if (char.length > 1) throw 'Padding char must be of legnth 1';

    let result = [];
    if (string1.length < string2.length) {
        string1 = string1 + char.repeat(string2.length - string1.length);
    } else {
        string2 = string2 + char.repeat(string1.length - string2.length);
    }

    for (let i = 0; i < string1.length; i++) {
        result.push(string1[i]);
        result.push(string2[i]);
    }

    return result.join('');
};

module.exports = {
    sortString,
    replaceChar,
    mashUp,
};
