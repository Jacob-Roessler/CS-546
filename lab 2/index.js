// Name: Jacob Roessler
// Pledge: I pledge my honor that I have abided by the Stevens Honor System.

arrayUtils = require('./arrayUtils');
stringUtils = require('./stringUtils');
objUtils = require('./objUtils');

//Test Cases
//arrayUtils.js

// average Tests
try {
    // Should Pass
    const average = arrayUtils.average([
        [1, 3],
        [2, 4, 5],
    ]); //returns 3
    console.log('average passed successfully');
} catch (e) {
    console.error('average failed test case');
}
try {
    // Should Fail
    const average = arrayUtils.average([[1, 3], [1], []]);
    console.error('average did not error');
} catch (e) {
    console.log('average failed successfully');
}

// modeSquared Tests
try {
    // Should Pass
    const m = arrayUtils.modeSquared([1, 2, 3, 3, 4]); // Returns: 9
    console.log('modeSquared passed successfully');
} catch (e) {
    console.error('modeSquared failed test case');
}
try {
    // Should Fail
    const m = arrayUtils.modeSquared(['guitar', 1, 3, 'apple']);
    console.error('modeSquared did not error');
} catch (e) {
    console.log('modeSquared failed successfully');
}

// medianElement Tests
try {
    // Should Pass
    const median = arrayUtils.medianElement([5, 6, 7]); // Returns: {'6': 1}
    console.log('medianElement passed successfully');
} catch (e) {
    console.error('medianElement failed test case');
}
try {
    // Should Fail
    const median = arrayUtils.medianElement('invalid'); // throws error
    console.error('medianElement did not error');
} catch (e) {
    console.log('medianElement failed successfully');
}

// merge Tests
try {
    // Should Pass
    const merged = arrayUtils.merge(['A', 'B', 'a'], [1, 2, 'Z']); // Returns ['a', 'A', 'B', 'Z', 1, 2]
    console.log('merge passed successfully');
} catch (e) {
    console.error('merge failed test case');
}
try {
    // Should Fail
    const merged = arrayUtils.merge([1, 'b', null], [null, 'null', null]); // throws
    console.error('merge did not error');
} catch (e) {
    console.log('merge failed successfully');
}

//stringUtils.js
// sortString tests

try {
    // Should Pass
    const sorted = stringUtils.sortString('123 FOO BAR!'); // Returns: "ABFOOR!123  "
    console.log('sortString passed successfully');
} catch (e) {
    console.error('sortString failed test case');
}
try {
    // Should Fail
    const sorted = stringUtils.sortString(['Hello', 'World']); // Throws Error
    console.error('sortString did not error');
} catch (e) {
    console.log('sortString failed successfully');
}

// replaceChar tests

try {
    // Should Pass
    const replaced = stringUtils.replaceChar('Daddy', 2); // Returns: "Daday"
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed test case');
}
try {
    // Should Fail
    const replaced = stringUtils.replaceChar('foobar', 0); // Throws Error
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
}

// mashUp tests

try {
    // Should Pass
    const mash = stringUtils.mashUp('Patrick', 'Hill', '$'); //Returns "PHaitlrli$c$k$"
    console.log('mashUp passed successfully');
} catch (e) {
    console.error('mashUp failed test case');
}
try {
    // Should Fail
    const mash = stringUtils.mashUp('Patrick', ''); //Throws error
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
}

//objUtils.js
//computeObjects

try {
    // Should Pass
    const first = { x: 2, y: 3 };
    const second = { a: 70, x: 4, z: 5 };
    const firstSecond = objUtils.computeObjects([first, second], (x) => x * 2);
    //{ x: 12, y: 6, a: 140, z: 10 }
    // x = (2 * 2) + (4 * 2)
    console.log('computeObjects passed successfully');
} catch (e) {
    console.error('computeObjects failed test case');
}
try {
    // Should Fail
    const first = { x: 2, y: 3 };
    const second = { a: 70, x: 4, z: 5 };
    const firstSecond = objUtils.computeObjects([first, second, {}], (x) => x * 2); //Throws error
    console.error('computeObjects did not error');
} catch (e) {
    console.log('computeObjects failed successfully');
}

//commonKeys

try {
    // Should Pass

    const first = { a: 2, b: { x: 7 } };
    const second = { a: 3, b: { x: 7, y: 10 } };
    const common = objUtils.commonKeys(first, second); // {b: { x: 7}}
    console.log('commonKeys passed successfully');
} catch (e) {
    console.error('commonKeys failed test case');
}
try {
    // Should Fail
    const first = 'invalid';
    const second = { a: 3, b: { x: 7, y: 10 } };
    const common = objUtils.commonKeys(first, second); //Throws error
    console.error('commonKeys did not error');
} catch (e) {
    console.log('commonKeys failed successfully');
}

//flipObject

try {
    // Should Pass
    const flipped = objUtils.flipObject({ a: 3, b: 7, c: { x: 1 } });
    /* Returns:
    {
      3: a,
      7: b,
      c: {1: x}
    }
    */
    console.log('flipObject passed successfully');
} catch (e) {
    console.error('flipObject failed test case');
}
try {
    // Should Fail
    const flipped = objUtils.flipObject({});
    console.error('flipObject did not error');
} catch (e) {
    console.log('flipObject failed successfully');
}
