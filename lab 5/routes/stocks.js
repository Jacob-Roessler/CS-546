const express = require('express');
const router = express.Router();
const data = require('../data');
const stockData = data.stocks;

router.get('/', async (request, response) => {
    try {
        const stocks = await stockData.getStocks();
        response.json(stocks);
    } catch (e) {
        response.status(500).json({ error: e });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const stock = await stockData.getStockById(request.params.id);
        response.json(stock);
    } catch {
        response.status(404).json({ message: 'stock not found' });
    }
});

module.exports = router;
