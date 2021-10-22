const axios = require('axios');

async function getPeople() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
    );
    return data; // this will be the array of people objects
}

module.exports = {
    async getPeople() {
        return await getPeople();
    },
    async getPersonById(id) {
        if (id === undefined) throw new Error('id parameter does not exist.');
        if (typeof id !== 'string') throw new Error('id parameter is not of type string');
        if (id.trim().length === 0) throw new Error('id cannot be empty spaces');

        const people = await getPeople();
        let exists = false;

        for (let i = 0; i < people.length; i++) {
            if (people[i].id === id) {
                exists = true;
                return people[i];
            }
        }

        if (!exists) throw new Error('person not found');
    },
};
