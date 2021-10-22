//Name: Jacob Roessler
//Pledge: I pledge my honor that I have abided by the Stevens Honor System.

const people = require('./people');
const stocks = require('./stocks');

async function main() {
    try {
        const person = await people.getPersonById('7989fa5e-8f3f-458d-ad58-23c8d9ef5a10');
        console.log('Completed Successfully');
    } catch (e) {
        console.log('getPersonById shouldnt fail');
    }

    try {
        const person = await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log('getPersonById should have failed');
    } catch (e) {
        console.log('Failed successfully');
    }

    try {
        const matches = await people.sameStreet('Sutherland', 'Point');
        console.log('Completed Successfully');
    } catch (e) {
        console.log('samestreet should not fail');
    }

    //Should Fail
    try {
        const test = await people.sameStreet('Crownhardt', 'Park');
        console.log('sameStreet should have failed');
    } catch (e) {
        console.log('Failed successfully');
    }

    //Shouldnt Fail
    try {
        const test = await people.manipulateSsn();
        console.log('Completed Successfully');
    } catch (e) {
        console.log('manipulateSsn should not fail');
    }

    //Shouldnt Fail
    try {
        const test = await people.sameBirthday(09, 25);
        console.log('Completed Successfully');
    } catch (e) {
        console.log('sameBirthday should not fail');
    }

    //Should Fail
    try {
        const test = await people.sameBirthday('09', '31');
        console.log('sameBirthday should have failed');
    } catch (e) {
        console.log('Failed successfully');
    }

    //stocks.js tests
    //Shouldnt Fail
    try {
        const test = await stocks.listShareholders();
        console.log('Completed Successfully');
    } catch (e) {
        console.log('listShareholders should not fail');
    }

    //Shouldnt Fail
    try {
        const test = await stocks.topShareholder('Aeglea BioTherapeutics, Inc.');
        console.log('Completed Successfully');
    } catch (e) {
        console.log('topShareholder should not fail');
    }

    //Should Fail
    try {
        const test = await stocks.topShareholder('Foobar Inc');
        console.log('topShareholder should have failed');
    } catch (e) {
        console.log('Failed successfully');
    }

    //Shouldnt Fail
    try {
        const test = await stocks.listStocks('Grenville', 'Pawelke');
        console.log('Completed Successfully');
    } catch (e) {
        console.log('listStocks should not fail');
    }

    //Should Fail
    try {
        const test = await stocks.listStocks('Patrick', 'Hill');
        console.log('listStocks should have failed');
    } catch (e) {
        console.log('Failed successfully');
    }

    //Shouldnt Fail
    try {
        const test = await stocks.getStockById('f652f797-7ca0-4382-befb-2ab8be914ff0');
        console.log('Completed Successfully');
    } catch (e) {
        console.log('getStockById should not fail');
    }

    //Should Fail
    try {
        const test = await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log('getStockById should have failed');
    } catch (e) {
        console.log('Failed successfully');
    }
}

main();
