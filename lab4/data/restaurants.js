const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;

let { ObjectId } = require('mongodb');

function stringToId(id) {
    //Code from lab4 assignment
    //check to make sure we have input at all
    if (!id) throw 'Id parameter must be supplied';

    //check to make sure it's a string
    if (typeof id !== 'string') throw 'Id must be a string';

    //Now we check if it's a valid ObjectId so we attempt to convert a value to a valid object ID,
    //if it fails, it will throw an error (you do not have to throw the error, it does it automatically and the catch where you call the function will catch the error just as it catches your other errors).
    let parsedId = ObjectId(id);
    return parsedId;
}

const checkString = (str, variableName) => {
    if (typeof str !== 'string' || str.trim().length === 0)
        throw new Error(`${variableName} must be a non-empty string`);
};

module.exports = {
    async create(
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        overallRating,
        serviceOptions
    ) {
        if (!name) throw new Error('No name provided.');
        if (!location) throw new Error('No location provided.');
        if (!phoneNumber) throw new Error('No phoneNumber provided.');
        if (!website) throw new Error('No website provided.');
        if (!priceRange) throw new Error('No priceRange provided.');
        if (!cuisines) throw new Error('No cuisines provided.');
        if (!overallRating) throw new Error('No overallRating provided.');
        if (!serviceOptions) throw new Error('No serviceOptions provided.');

        checkString(name, 'name');
        checkString(location, 'location');
        checkString(phoneNumber, 'phoneNumber');
        checkString(website, 'website');
        checkString(priceRange, 'priceRange');

        //https://stackoverflow.com/questions/18375929/validate-phone-number-using-javascript
        let phoneno = new RegExp(/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/);
        if (!phoneno.test(phoneNumber))
            throw new Error('Phone number does not match format: xxx-xxx-xxxx.');

        let webs = new RegExp(/^(http:\/\/www.)[a-zA-Z]{5,}(.com)$/);
        if (!webs.test(website)) throw new Error('Invalid website.');

        let prange = new RegExp(/^\${1,4}$/);
        if (!prange.test(priceRange)) throw new Error('Invalid price range not in range $-$$$$.');

        if (!Array.isArray(cuisines)) throw new Error('Cuisines must be an array.');
        if (cuisines.length === 0) throw new Error('Cuisines cannot be empty.');
        for (const c of cuisines) {
            if (typeof c !== 'string') throw Error('Cuisines must only contain strings');
            if (c.trim().length === 0) throw Error('Cuisines cannot contain empty strings.');
        }

        if (overallRating < 0 || overallRating > 5)
            throw new Error('Rating must be in range [0-5].');

        if (typeof serviceOptions !== 'object') throw new Error('serviceOptions must be an object');
        if (
            typeof serviceOptions.dineIn !== 'boolean' ||
            typeof serviceOptions.takeOut !== 'boolean' ||
            typeof serviceOptions.delivery !== 'boolean'
        )
            throw new Error('Service options should contain booleans');

        // Todo: the rest of the error checking here

        const restaurantCollection = await restaurants();

        let newRestaurantInfo = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: overallRating,
            serviceOptions: serviceOptions,
        };

        const insertInfo = await restaurantCollection.insertOne(newRestaurantInfo);
        if (insertInfo.insertedCount === 0) throw new Error('Could not add restaurant.');

        const newRestaurant = await this.get(insertInfo.insertedId.toString());

        return newRestaurant;
    },

    async getAll() {
        const restaurantCollection = await restaurants();
        const restaurantList = await restaurantCollection.find({}).toArray();

        // TODO convert all _ids to string
        for (const r of restaurantList) {
            r._id = r._id.toString();
        }

        return restaurantList;
    },

    async get(id) {
        if (!id) throw new Error('You must provide an id to search for.');
        if (typeof id !== 'string') throw new Error('Id must be a string.');
        if (!ObjectId.isValid(id)) throw new Error('Invalid objectId');
        // TODO more error checking

        const queryId = stringToId(id);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: queryId });
        if (restaurant === null) throw new Error('No restaurant with that id.');

        restaurant._id = restaurant._id.toString();
        return restaurant;
    },

    async remove(id) {
        if (!id) throw new Error('You must provide an id to search for.');
        if (typeof id !== 'string') throw new Error('Id must be a string.');
        if (!ObjectId.isValid(id)) throw new Error('Invalid objectId');

        const queryId = stringToId(id);
        const restaurantCollection = await restaurants();
        const restaurant = await this.get(id);
        const deletionInfo = await restaurantCollection.deleteOne({ _id: queryId });

        if (deletionInfo.deletedCount === 0) {
            throw new Error(`Could not delete restaurant with id of ${id}`);
        }

        return `${restaurant.name} has been successfully been deleted`;
    },

    async rename(id, newWebsite) {
        if (!id) throw new Error('You must provide an id to search for.');
        if (typeof id !== 'string') throw new Error('Id must be a string.');
        if (!ObjectId.isValid(id)) throw new Error('Invalid objectId');

        checkString(newWebsite);
        let webs = new RegExp(/^(http:\/\/www.)[a-zA-Z]{5,}(.com)$/);
        if (!webs.test(newWebsite)) throw new Error('Invalid website.');

        const queryId = stringToId(id);
        const restaurantCollection = await restaurants();
        const oldRestaurant = await this.get(id);

        if (oldRestaurant.website === newWebsite) throw new Error('Website value must be differnt');

        const updatedRestaurant = {
            name: oldRestaurant.name,
            location: oldRestaurant.location,
            phoneNumber: oldRestaurant.phoneNumber,
            website: newWebsite,
            priceRange: oldRestaurant.priceRange,
            cuisines: oldRestaurant.cuisines,
            overallRating: oldRestaurant.overallRating,
            serviceOptions: oldRestaurant.serviceOptions,
        };

        const updatedInfo = await restaurantCollection.updateOne(
            { _id: queryId },
            { $set: updatedRestaurant }
        );

        if (updatedInfo.modifiedCount === 0)
            throw new Error('Could not update restaurant sucessfully.');

        return await this.get(id);
    },
};
