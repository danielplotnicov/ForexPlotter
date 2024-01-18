const express = require('express');
const { getHistoricalRates } = require("dukascopy-node");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/forex-data', async (req, res) => {
    try {
        const { instrument, from, to, timeframe } = req.query;

        const data = await getHistoricalRates({
            instrument: instrument,
            dates: {
                from: new Date(from),
                to: new Date(to),
            },
            timeframe: timeframe,
            format: "json",
            useCache: true,
        });

        res.json(data);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Error fetching forex data");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
