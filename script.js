document.addEventListener('DOMContentLoaded', function() {
    fetchData();

    function fetchData() {
        fetch('Data.csv')
            .then(response => response.text())
            .then(data => {
                processData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function processData(data) {
        // Split the CSV data into rows
        const rows = data.trim().split('\n');
        const headers = rows[0].split(',');

        // Initialize arrays to store data
        let dates = [];
        let pHValues = [];
        let codValues = [];
        let ssValues = [];
        let dischargeValues = [];

        // Iterate through rows (starting from index 1, assuming index 0 is header)
        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(',');
            dates.push(rowData[0]); // Assuming date is the first column

            // Assuming pH, COD, SS, and Volume of discharge are the next columns respectively
            pHValues.push(parseFloat(rowData[1]));
            codValues.push(parseFloat(rowData[2]));
            ssValues.push(parseFloat(rowData[3]));
            dischargeValues.push(parseFloat(rowData[4]));
        }

        // Call functions to create each chart
        createLineChart('dateVsPHChart', dates, pHValues, 'Date vs pH', 'Date', 'pH');
        createLineChart('dateVsCODChart', dates, codValues, 'Date vs COD', 'Date', 'COD');
        createLineChart('dateVsSSChart', dates, ssValues, 'Date vs SS', 'Date', 'SS');
        createBarChart('dateVsDischargeChart', dates, dischargeValues, 'Date vs Discharge Volume', 'Date', 'Volume (m3)');
    }

    function createLineChart(chartId, labels, data, chartLabel, xAxisLabel, yAxisLabel) {
        var canvas = document.getElementById(chartId);
        if (!canvas) {
            console.error('Canvas element with ID ' + chartId + ' not found.');
            return;
        }
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context for canvas ' + chartId);
            return;
        }
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: chartLabel,
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
                }
            }
        });
    }

    function createBarChart(chartId, labels, data, chartLabel, xAxisLabel, yAxisLabel) {
        var canvas = document.getElementById(chartId);
        if (!canvas) {
            console.error('Canvas element with ID ' + chartId + ' not found.');
            return;
        }
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context for canvas ' + chartId);
            return;
        }
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chartLabel,
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
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
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
