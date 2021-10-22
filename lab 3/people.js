const axios = require('axios');

async function getPeople() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
    );
    return data; // this will be the array of people objects
}

const getPersonById = async function getPersonById(id) {
    if (id === undefined) throw 'id parameter does not exist.';
    if (typeof id !== 'string') throw 'id parameter is not of type string';
    if (id.trim().length === 0) throw 'id cannot be empty spaces';

    const people = await getPeople();
    let exists = false;

    for (let i = 0; i < people.length; i++) {
        if (people[i].id === id) {
            exists = true;
            return people[i];
        }
    }

    if (!exists) throw 'person not found';
};

const sameStreet = async function sameStreet(streetName, streetSuffix) {
    if (streetName === undefined || streetSuffix === undefined) throw 'parameter does not exist.';
    if (typeof streetName !== 'string' || typeof streetSuffix !== 'string')
        throw 'parameters must be of type string';

    const people = await getPeople();
    let result = [];

    const insensitive_equal = (s1, s2) => {
        return s1.toLowerCase() === s2.toLowerCase();
    };

    people.forEach((person) => {
        if (
            insensitive_equal(person.address.home.street_name, streetName) &&
            insensitive_equal(person.address.home.street_suffix, streetSuffix)
        )
            result.push(person);
        else if (
            insensitive_equal(person.address.work.street_name, streetName) &&
            insensitive_equal(person.address.work.street_suffix, streetSuffix)
        )
            result.push(person);
    });

    if (result.length < 2) {
        throw `There are not 2 or more people with ${streetName}, ${streetSuffix}.`;
    } else {
        return result;
    }
};

const manipulateSsn = async function manipulateSsn() {
    const people = await getPeople();
    let numSsns = [];

    const result = { highest: {}, lowest: {}, average: -1 };

    const ssnToNum = (ssn) => {
        return parseInt(ssn.trim().replace('-', '').replace('-', '').split('').sort().join(''));
    };

    people.forEach((person) => {
        const toNum = ssnToNum(person.ssn);
        numSsns.push(toNum);
    });

    const maxSsn = numSsns.reduce((a, b) => {
        return Math.max(a, b);
    });

    const minSsn = numSsns.reduce((a, b) => {
        return Math.min(a, b);
    });

    const lowest = people.find((person) => ssnToNum(person.ssn) === minSsn);
    const highest = people.find((person) => ssnToNum(person.ssn) === maxSsn);

    const sum = numSsns.reduce((a, b) => a + b);
    const average = Math.floor(sum / numSsns.length);

    result.highest = { firstName: highest.first_name, lastName: highest.last_name };
    result.lowest = { firstName: lowest.first_name, lastName: lowest.last_name };
    result.average = average;

    return result;
};

const sameBirthday = async function sameBirthday(month, day) {
    if (month === undefined || day === undefined) throw 'missing parameter';
    if (typeof month !== 'number' && typeof month !== 'string') throw 'invalid type for month';
    if (typeof day !== 'number' && typeof day !== 'string') throw 'invalid type for day';
    month = parseInt(month);
    day = parseInt(day);
    const validDates = {
        1: { name: 'January', days: 31 },
        2: { name: 'February', days: 28 },
        3: { name: 'March', days: 31 },
        4: { name: 'April', days: 30 },
        5: { name: 'May', days: 31 },
        6: { name: 'June', days: 30 },
        7: { name: 'July', days: 31 },
        8: { name: 'August', days: 31 },
        9: { name: 'September', days: 30 },
        10: { name: 'October', days: 31 },
        11: { name: 'November', days: 30 },
        12: { name: 'December', days: 31 },
    };
    if (month < 1 || month > 12) throw 'invalid value for month';
    if (day < 1 || day > validDates[month].days)
        throw `Error: There are not ${day} days in ${validDates[month].name}`;

    const people = await getPeople();
    let result = [];

    const getMonthDay = (person) => {
        const bd = person.date_of_birth.split('/');
        const month = parseInt(bd[0]);
        const day = parseInt(bd[1]);

        return [month, day];
    };

    people.forEach((person) => {
        const bd = getMonthDay(person);
        if (bd[0] === month && bd[1] === day)
            result.push(`${person.first_name} ${person.last_name}`);
    });

    if (result.length === 0) throw `There are no people with birthday ${month}/${day}`;
    return result;
};

module.exports = {
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday,
};
