const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;

router.get('/', async (request, response) => {
    try {
        const people = await peopleData.getPeople();
        response.json(people);
    } catch (e) {
        response.status(500).json({ error: e });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const person = await peopleData.getPersonById(request.params.id);
        response.json(person);
    } catch {
        response.status(404).json({ message: 'Person not found' });
    }
});

module.exports = router;
