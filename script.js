document.addEventListener('DOMContentLoaded', function() {
    fetchData(); // Call fetchData() when DOM is fully loaded

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
        // Process CSV data here and create charts using Chart.js or other libraries
        // Example:
        // - Parse CSV data
        // - Create Chart.js instances for each chart type (pH, COD, SS, Volume)

        // Example chart creation with Chart.js:
        var ctx1 = document.getElementById('pHChart').getContext('2d');
        var pHChart = new Chart(ctx1, {
            type: 'line',
            data: {
                // Chart data here
            },
            options: {
                // Chart options here
            }
        });

        var ctx2 = document.getElementById('CODChart').getContext('2d');
        var CODChart = new Chart(ctx2, {
            type: 'line',
            data: {
                // Chart data here
            },
            options: {
                // Chart options here
            }
        });

        // Repeat for SSChart and VolumeChart
        var ctx3 = document.getElementById('SSChart').getContext('2d');
        var SSChart = new Chart(ctx3, {
            type: 'line',
            data: {
                // Chart data here
            },
            options: {
                // Chart options here
            }
        });

        var ctx4 = document.getElementById('VolumeChart').getContext('2d');
        var VolumeChart = new Chart(ctx4, {
            type: 'bar',
            data: {
                // Chart data here
            },
            options: {
                // Chart options here
            }
        });
    }
});
