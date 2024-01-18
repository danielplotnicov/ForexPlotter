let currentChart = null;

async function fetchAndPlotData(instrument, fromDate, toDate, timeframe) {
    try {
        const response = await fetch(`/api/forex-data?instrument=${instrument}&from=${fromDate}&to=${toDate}&timeframe=${timeframe}`);
        const data = await response.json();

        const candleData = data.map(item => ({
            x: new Date(item.timestamp),
            o: item.open,
            h: item.high,
            l: item.low,
            c: item.close
        }));

        createCandlestickChart(candleData);
    } catch (error) {
        console.error('Error fetching forex data:', error);
    }
}

function createCandlestickChart(data) {
    const ctx = document.getElementById('forexChart').getContext('2d');

    if (currentChart) {
        currentChart.destroy();
    }

    currentChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: document.getElementById('instrument').value,
                data: data
            }]
        },
        options: {
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x'
                    },
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x'
                    }
                }
            }
        }
    });
    // Zoom in to show the last 100 candles
/*    if (data.length > 100) {
        const minTime = data[data.length - 100].x;
        currentChart.zoomScale('x', {
            min: minTime,
            max: data[data.length - 1].x
        });
    }*/
}

document.getElementById('fetchData').addEventListener('click', () => {
    const instrument = document.getElementById('instrument').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const timeframe = document.getElementById('timeframe').value;

    fetchAndPlotData(instrument, fromDate, toDate, timeframe);
});
