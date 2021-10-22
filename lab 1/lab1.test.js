// Name: Jacob Roessler
// I pledge my honor that I have abided by the Stevens Honor System.

const lab1 = require('./lab1');

console.log(lab1.questionOne([5, 3, 10]));
// returns and outputs: {'18': false, '2': true, '93': false} key output order doesnt matter for objects

console.log(lab1.questionOne([1, 2]));
// returns and outputs: { '3': true, '6': false }

console.log(lab1.questionOne([2]));
// returns and outputs: {'3': true}

console.log(lab1.questionOne([]));
// returns and outputs: {}

console.log(lab1.questionOne());
// returns and outputs: {}

console.log(lab1.questionTwo([1, 2, 3, 2, 1]));
// should return and output: [1, 2, 3]

console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
//returns and outputs: [1]

console.log(lab1.questionTwo([1, '1', 1, '1', 2]));
// returns and outputs: [1, '1', 2]

console.log(lab1.questionTwo([3, 'a', 'b', 3, '1']));
// returns and outputs: [3, 'a', 'b', '1']

console.log(lab1.questionTwo([]));
//returns and outputs: []

console.log(lab1.questionThree(['bar', 'car', 'car', 'arc']));
// should return and output: { arc: ["car", "arc"] }

console.log(lab1.questionThree(['cat', 'act', 'foo', 'bar']));
// returns and outputs: { act: ["cat", "act"] }

console.log(lab1.questionThree(['race', 'care', 'foo', 'foo', 'foo']));
// returns and outputs: { acer: ["race", "care"] }

console.log(lab1.questionThree(['foo', 'bar', 'test', 'Patrick', 'Hill']));
// returns and outputs: {}

console.log(lab1.questionThree([]));
// returns and outputs: {}

console.log(lab1.questionFour(1, 3, 2));
//returns and outputs: 4

console.log(lab1.questionFour(2, 5, 6));
//returns and outputs: 194

console.log(lab1.questionFour(1, 2, 3));
//returns and outputs: 4

console.log(lab1.questionFour(4, 5, 6));
//returns and outputs: 172

console.log(lab1.questionFour(10, 0, 1));
//returns and outputs: 989673
