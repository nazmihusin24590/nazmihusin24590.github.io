async function fetchData() {
    try {
        const response = await fetch('Data.csv');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.text();
        console.log('Fetched data:', data);

        // Parse CSV data
        const rows = data.split('\n').slice(1); // Remove header row
        const dates = [];
        const pHValues = [];
        const codValues = [];
        const ssValues = [];
        const dischargeValues = [];

        rows.forEach(row => {
            const columns = row.split(',');
            const date = columns[0];
            const pH = parseFloat(columns[1]);
            const cod = parseFloat(columns[2]);
            const ss = parseFloat(columns[3]);
            const discharge = parseFloat(columns[4]);

            dates.push(date);
            pHValues.push(pH);
            codValues.push(cod);
            ssValues.push(ss);
            dischargeValues.push(discharge);
        });

        console.log('Dates:', dates);
        console.log('pH values:', pHValues);
        console.log('COD values:', codValues);
        console.log('SS values:', ssValues);
        console.log('Discharge values:', dischargeValues);

        // Create charts
        createLineChart('dateVsPHChart', dates, pHValues, 'Date vs pH', 'Date', 'pH');
        createLineChart('dateVsCODChart', dates, codValues, 'Date vs COD', 'Date', 'COD');
        createLineChart('dateVsSSChart', dates, ssValues, 'Date vs SS', 'Date', 'SS');
        createBarChart('dateVsDischargeChart', dates, dischargeValues, 'Date vs Discharge Volume', 'Date', 'Volume (m³)');

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

function createLineChart(canvasId, labels, data, chartTitle, xAxisLabel, yAxisLabel) {
    const ctx = document.getElementById(canvasId).getContext('2d');
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
            },
            plugins: {
                title: {
                    display: true,
                    text: chartTitle
                }
            }
        }
    });
}

function createBarChart(canvasId, labels, data, chartTitle, xAxisLabel, yAxisLabel) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: yAxisLabel,
                data: data,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }]
        },
        options: {
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
            },
            plugins: {
                title: {
                    display: true,
                    text: chartTitle
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});
