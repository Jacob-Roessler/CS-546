// Name: Jacob Roessler
// Pledge: I pledge my honor that I have abided by the Stevens Honor System.

const restaurants = require('./data/restaurants');
const connection = require('./config/mongoConnection');

const main = async () => {
    // 1. Create a restaurant of your choice.
    const saffronLounge = await restaurants.create(
        'The Saffron Lounge',
        'New York City, New York',
        '123-456-7890',
        'http://www.saffronlounge.com',
        '$$$$',
        ['Cuban', 'Italian'],
        3,
        { dineIn: true, takeOut: true, delivery: false }
    );
    // 2. Log the newly created restaurant. (Just that restaurant, not all restaurants)
    console.log(saffronLounge);

    // 3. Create another restaurant of your choice.
    const paprikaCafe = await restaurants.create(
        'The Paprika Cafe',
        'Trenton, New Jersey',
        '999-888-7777',
        'http://www.paprikacafe.com',
        '$$',
        ['American'],
        3,
        { dineIn: true, takeOut: false, delivery: false }
    );

    // 4. Query all restaurants, and log them all
    const allrestaurants = await restaurants.getAll();
    console.log(allrestaurants);

    // 5. Create the 3rd restaurant of your choice.
    const chilePepper = await restaurants.create(
        'The Chile Pepper',
        'Hoboken, New Jersey',
        '444-222-9090',
        'http://www.chilepepper.com',
        '$$$',
        ['Mexican'],
        3,
        { dineIn: true, takeOut: true, delivery: true }
    );

    // 6. Log the newly created 3rd restaurant. (Just that restaurant, not all restaurants)
    console.log(chilePepper);

    // 7. Rename the first restaurant website
    const renamedSaffronLounge = await restaurants.rename(
        saffronLounge._id.toString(),
        'http://www.thesaffronlounge.com'
    );
    // 8. Log the first restaurant with the updated website.
    console.log(renamedSaffronLounge);

    // 9. Remove the second restaurant you created.
    const removePaprika = await restaurants.remove(paprikaCafe._id.toString());

    // 10. Query all restaurants, and log them all
    const allrestaurants2 = await restaurants.getAll();
    console.log(allrestaurants2);

    // 11. Try to create a restaurant with bad input parameters to make sure it throws errors.
    try {
        //Should throw an invalid website error
        const badRestaurant = await restaurants.create(
            'This wont work',
            'Hoboken, New Jersey',
            '444-222-9090',
            'http://www.err.com',
            '$$$$$$$$$ this could also error',
            ['N/A'],
            3,
            { dineIn: true, takeOut: true, delivery: true }
        );
    } catch (e) {
        console.log(e);
    }

    // 12. Try to remove a restaurant that does not exist to make sure it throws errors.
    try {
        const failedRemove = await restaurants.remove(paprikaCafe._id.toString());
    } catch (e) {
        console.log(e);
    }

    // 13. Try to rename a restaurant that does not exist to make sure it throws errors.
    try {
        const failedRename = await restaurants.rename(
            paprikaCafe._id.toString(), //Id of the already removed restaurant
            'http://www.example.com'
        );
    } catch (e) {
        console.log(e);
    }

    // 14. Try to rename a restaurant passing in invalid data for the parameter to make sure it throws errors.
    try {
        const failedRename = await restaurants.rename(
            saffronLounge._id.toString(),
            'http:www.bad.com' // bad website will fail
        );
    } catch (e) {
        console.log(e);
    }

    // 15. Try getting a restaurant by ID that does not exist to make sure it throws errors.
    try {
        const failedGet = await restaurants.get(paprikaCafe._id.toString());
    } catch (e) {
        console.log(e);
    }

    const db = await connection();
    await db.serverConfig.close();
};

main();
