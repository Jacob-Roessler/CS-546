const axios = require('axios');

async function getStocks() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json'
    );
    return data; // this will be the array of people objects
}

module.exports = {
    async getStocks() {
        return await getStocks();
    },
    async getStockById(id) {
        if (id === undefined) throw new Error('id parameter does not exist.');
        if (typeof id !== 'string') throw new Error('id parameter is not of type string');
        if (id.trim().length === 0) throw new Error('id cannot be empty spaces');

        const stocks = await getStocks();
        let exists = false;

        for (let i = 0; i < stocks.length; i++) {
            if (stocks[i].id === id) {
                exists = true;
                return stocks[i];
            }
        }

        if (!exists) throw new Error('stock not found');
    },
};
