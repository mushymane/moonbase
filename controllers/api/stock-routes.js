const router = require('express').Router();
const { User, Stock } = require('../../models');

// gets all stocks /api/stocks/
router.get('/', async (req, res) => {
  try {
    const stockData = await Stock.findAll();
    res.status(200).json(stockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets a stock based on ticker id /api/stocks/:ticker
router.get('/:ticker', async (req, res) => {
  try {
    const stockData = await Stock.findByPk(req.params.ticker);

    if (!stockData) {
      res.status(404).json({ message: 'invalid ticker' });
      return;
    }

    res.status(200).json(stockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// adds new stock /api/stocks
router.post('/', async (req, res) => {
  try {
    const stockData = await User.create({ ...req.body });
    res.status(200).json(stockData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//updates stock based on ticker /api/stocks/:ticker
router.put('/:ticker', async (req, res) => {
  try {
    const stockData = await Stock.update(
      {
        name: req.body.name,
        price: req.body.price,
        change: req.body.change,
        percent_change: req.body.percent_change,
        open: req.body.open,
        high: req.body.high,
        low: req.body.low,
      },
      {
        where: {
          ticker: req.params.ticker,
        },
      },
    );
    if (!stockData) {
      res.status(404).json({ message: 'No stock found with this id' });
      return;
    }
    res.status(200).json(stockData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

//deletes stock based on ticker id /api/posts/:ticker
router.delete('/:id', async (req, res) => {
  try {
    const stockData = Stock.destroy({
      where: {
        ticker: req.params.ticker,
      },
    });
    if (!stockData) {
      res.status(404).json({ message: 'No Stock found with this id' });
      return;
    }
    res.status(200).json({ message: 'deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;
