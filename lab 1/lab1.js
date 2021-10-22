// I pledge my honor that I have abided by the Stevens Honor System.

const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let result = {};
    if (arr === undefined) {
        return result;
    }

    let isPrime = (x) => {
        for (let i = 2; i < x; i++) {
            if (x % i === 0) {
                return false;
            }
        }
        return true;
    };

    arr.forEach((val) => {
        let newVal = Math.abs(Math.pow(val, 2) - 7);
        result[newVal] = isPrime(newVal);
    });

    return result;
};

const questionTwo = function questionTwo(arr) {
    //Implement question 2 here
    //Compares the index of the first occurance of a given value with the current index of the value
    //This will ensure that if there are duplicates they will not be included because any duplicate after
    //The first occurance will not satisfy the filter condition.
    let result = arr.filter((val, index) => arr.indexOf(val) === index);

    return result;
};

const questionThree = function questionThree(arr) {
    // Implement question 3 here

    // remove duplicates
    let noDupes = questionTwo(arr);
    let wordObj = {};
    let resultObj = {};

    noDupes.forEach((str) => {
        // Snippet for sorting strings by first splitting into array then joining them from stack overflow
        // Source: https://stackoverflow.com/questions/30912663/sort-a-string-alphabetically-using-a-function
        let sortedStr = str.split('').sort().join('');
        if (wordObj[sortedStr]) {
            wordObj[sortedStr].push(str);
        } else {
            wordObj[sortedStr] = [str];
        }
    });

    for (key in wordObj) {
        if (wordObj[key].length > 1) {
            resultObj[key] = wordObj[key];
        }
    }
    return resultObj;
};

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    let factorial = (x) => {
        let fact = x - 1;
        while (fact > 0) {
            x *= fact;
            fact--;
        }

        return x;
    };

    let sum = factorial(num1) + factorial(num2) + factorial(num3);
    let avg = (num1 + num2 + num3) / 3;
    return Math.floor(sum / avg);
};

module.exports = {
    firstName: 'Jacob',
    lastName: 'Roessler',
    studentId: '10448394',
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
};
