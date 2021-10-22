const axios = require('axios');
const people = require('./people');

async function getStocks() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json'
    );
    return data; // this will be the array of people objects
}

async function getPeople() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
    );
    return data; // this will be the array of people objects
}

const listShareholders = async function listShareholders() {
    if (arguments.length > 0) throw 'No arguments may be supplied to this function';
    const result = [];
    const stocks = await getStocks();
    const people = await getPeople();

    for (const stock of stocks) {
        const newObj = { id: stock.id, stock_name: stock.stock_name, shareholders: [] };
        for (const shareholder of stock.shareholders) {
            let person = {};
            for (const p of people) {
                if (shareholder.userId === p.id) {
                    person = p;
                    break;
                }
            }

            newObj.shareholders.push({
                first_name: person.first_name,
                last_name: person.last_name,
                number_of_shares: shareholder.number_of_shares,
            });
        }
        result.push(newObj);
    }

    return result;
};

const topShareholder = async function topShareholder(stockName) {
    if (stockName === undefined) throw 'missing parameter';
    if (typeof stockName !== 'string') throw `parameter must be a string`;
    if (stockName.trim().length === 0) throw 'parameter cannot be whitespace';

    const stocks = await getStocks();
    let maxID = -1;
    let shares = 0;

    for (const stock of stocks) {
        if (stock.stock_name === stockName) {
            if (stock.shareholders.length === 0) {
                return `${stock.stock_name} currently has no shareholders.`;
            }
            const maxHolder = stock.shareholders.reduce((pA, pB) => {
                return pA.number_of_shares < pB.number_of_shares ? pB : pA;
            });
            maxID = maxHolder.userId;
            shares = maxHolder.number_of_shares;
        }
    }

    if (maxID === -1) throw 'No stock with that name';

    const people = await getPeople();
    for (const person of people) {
        if (person.id === maxID) {
            return `With ${shares} shares in ${stockName}, ${person.first_name} ${person.last_name} is the top shareholder.`;
        }
    }
};

const listStocks = async function listStocks(firstName, lastName) {
    if (firstName === undefined || lastName === undefined) throw 'Missing parameter';
    if (typeof firstName !== 'string' || typeof lastName !== 'string')
        throw 'Parameters must be strings';
    if (firstName.trim().length === 0 || lastName.trim().length === 0)
        throw 'Strings cannot be empty spaces';

    const people = await getPeople();
    let person = {};

    for (const p of people) {
        if (p.first_name === firstName && p.last_name === lastName) {
            person = p;
        }
    }

    if (Object.keys(person).length === 0)
        throw `Error because ${firstName} ${lastName} is not in people.json`;

    const stocks = await getStocks();
    let result = [];

    for (const stock of stocks) {
        for (const shareholder of stock.shareholders) {
            if (person.id === shareholder.userId) {
                result.push({
                    stock_name: stock.stock_name,
                    numnber_of_shares: shareholder.number_of_shares,
                });
            }
        }
    }

    return result;
};

const getStockById = async function getStockById(id) {
    if (id === undefined) throw 'Missing parameter';
    if (typeof id !== 'string') throw 'Parameter must be a string';

    const stocks = await getStocks();

    const stock = stocks.find((stock) => stock.id === id);

    if (stock === undefined) throw 'stock not found.';

    return stock;
};

module.exports = {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById,
};
