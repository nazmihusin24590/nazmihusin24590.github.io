document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

async function fetchData() {
    // Get the current script's URL
    const scriptUrl = document.currentScript.src;
    
    // Extract the directory path from the script's URL
    const scriptPath = scriptUrl.substring(0, scriptUrl.lastIndexOf('/')) + '/';
    
    // Construct the URL to fetch Data.csv
    const csvUrl = scriptPath + 'Data.csv';

    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        
        // Parse CSV data
        const parsedData = parseCSVData(data);
        
        // Extract data arrays
        const dates = parsedData.map(entry => entry.date);
        const pHValues = parsedData.map(entry => parseFloat(entry.pH));
        const CODValues = parsedData.map(entry => parseFloat(entry.COD));
        const SSValues = parsedData.map(entry => parseFloat(entry.SS));
        const dischargeValues = parsedData.map(entry => parseFloat(entry.volume_of_discharge));

        // Create charts
        createLineChart('dateVsPHChart', dates, pHValues, 'Date vs pH', 'Date', 'pH');
        createLineChart('dateVsCODChart', dates, CODValues, 'Date vs COD', 'Date', 'COD');
        createLineChart('dateVsSSChart', dates, SSValues, 'Date vs SS', 'Date', 'SS');
        createBarChart('dateVsDischargeChart', dates, dischargeValues, 'Date vs Volume of Discharge', 'Date', 'Volume of Discharge (m3)');
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

function parseCSVData(csvData) {
    // Split CSV data into rows
    const rows = csvData.trim().split(/\r?\n/);
    if (rows.length < 2) return []; // If no data or only header row
    
    // Get headers from the first row
    const headers = rows[0].split(',');

    // Parse each subsequent row into an object
    const parsedData = rows.slice(1).map(row => {
        const values = row.split(',');
        const entry = {};
        headers.forEach((header, index) => {
            entry[header.trim()] = values[index].trim();
        });
        return entry;
    });

    return parsedData;
}

function createLineChart(chartId, labels, data, title, xAxisLabel, yAxisLabel) {
    const ctx = document.getElementById(chartId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: yAxisLabel,
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
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
                    title: {
                        display: true,
                        text: xAxisLabel
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: yAxisLabel
                    }
                }
            }
        }
    });
}

function createBarChart(chartId, labels, data, title, xAxisLabel, yAxisLabel) {
    const ctx = document.getElementById(chartId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: yAxisLabel,
                data: data,
                backgroundColor: 'rgb(54, 162, 235)'
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
                    title: {
                        display: true,
                        text: xAxisLabel
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: yAxisLabel
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
