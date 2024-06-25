// URL of the CSV file on GitHub
const csvUrl = 'https://github.com/nazmihusin24590/water-dashboard/blob/main/Data.csv';

// Function to fetch the CSV file and process the data
async function fetchData() {
    try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const csvData = await response.text();
        
        // Process the CSV data
        processData(csvData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to process the fetched CSV data
function processData(csvData) {
    // Parse CSV using a library or custom parsing logic
    const rows = csvData.split('\n'); // Split CSV into rows
    const headers = rows[0].split(',').map(header => header.trim()); // Extract headers
    const data = rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());
        return {
            date: values[0],
            pH: parseFloat(values[1]),
            COD: parseFloat(values[2]),
            SS: parseFloat(values[3]),
            volume: parseFloat(values[4])
        };
    });

    // Display charts
    displayCharts(data);
}

// Function to display charts using Chart.js
function displayCharts(data) {
    // Extract data for charts
    const dates = data.map(entry => entry.date);
    const pHValues = data.map(entry => entry.pH);
    const CODValues = data.map(entry => entry.COD);
    const SSValues = data.map(entry => entry.SS);
    const volumeValues = data.map(entry => entry.volume);

    // Create date vs pH chart
    createLineChart('Date vs pH', dates, pHValues, 'pH', 'rgba(75, 192, 192, 1)');

    // Create date vs COD chart
    createLineChart('Date vs COD', dates, CODValues, 'COD', 'rgba(255, 99, 132, 1)');

    // Create date vs SS chart
    createLineChart('Date vs SS', dates, SSValues, 'SS', 'rgba(54, 162, 235, 1)');

    // Create date vs volume of discharge chart
    createBarChart('Date vs Volume of Discharge', dates, volumeValues, 'Volume (m³)', 'rgba(153, 102, 255, 1)');
}

// Function to create a line chart using Chart.js
function createLineChart(title, labels, data, yAxisLabel, color) {
    const ctx = document.createElement('canvas');
    document.getElementById('chartsContainer').appendChild(ctx);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: yAxisLabel,
                data: data,
                borderColor: color,
                backgroundColor: color,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: yAxisLabel
                    }
                }
            }
        }
    });
}

// Function to create a bar chart using Chart.js
function createBarChart(title, labels, data, yAxisLabel, color) {
    const ctx = document.createElement('canvas');
    document.getElementById('chartsContainer').appendChild(ctx);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: yAxisLabel,
                data: data,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: yAxisLabel
                    }
                }
            }
        }
    });
}

// Call fetchData() to initiate data loading and chart creation
fetchData();
