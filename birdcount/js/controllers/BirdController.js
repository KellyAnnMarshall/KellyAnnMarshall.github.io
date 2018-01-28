function BirdController(BirdService) {
    var $ctrl = this;
    $ctrl.birdData;
    $ctrl.birdNames = [];
    $ctrl.birdCounts = [];
    $ctrl.backgroundColor = [];
    
    var getBirds = function(){
        BirdService.getBirds()
        .then(function (response) {
          return $ctrl.birdData = response;
        })
        .then(initProperties);
    }

    var initProperties = function() {
        $ctrl.birdData.map(function(bird) {
            $ctrl.birdNames.push(bird.name);
            $ctrl.birdCounts.push(bird.count);
            $ctrl.backgroundColor.push(bird.backgroundColor);
        });
    }

    $ctrl.$onInit = function() {
        $ctrl.birdData = getBirds();
    };

    $ctrl.play = (id) => {
        var audio_id = 'audio_' + id;
        var audio = document.getElementById(audio_id);
        if (audio.paused)
            audio.play();
        else
            audio.pause();
    }

    $ctrl.clearSearch = function() {
        $ctrl.searchText = '';
    };

    $ctrl.addBird = (id) => {
        chart.data.datasets.map(function(dataset) {
            dataset.data[id - 1] += 1;
        });
        chart.update();
    };

    $ctrl.removeBird = (id) => {
        chart.data.datasets.map(function(dataset) {
            if (dataset.data[id - 1] > 0) {
                dataset.data[id - 1] -= 1;
            }
        });
        chart.update();
    };

    var ctx = canvas.getContext('2d');
    var config = {
        type: 'horizontalBar',
        data: {
            labels: $ctrl.birdNames,
            datasets: [{
                label: $ctrl.birdNames,
                data: $ctrl.birdCounts,
                backgroundColor: $ctrl.backgroundColor
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: false,
            scales: {
                yAxes: [{
                    barPercentage: 1.0,
                    barThickness: 20,
                    ticks: {
                        fontColor: '#ccc',
                        fontSize: 20
                    }
                }],
                xAxes: [{
                    barPercentage: 1.0,
                    barThickness: 20,
                    ticks: {
                        fontColor: '#ccc',
                        fontSize: 20,
                        beginAtZero: true
                    }
                }]
            },
            tooltips: false,
            animation: {
                duration: 2000
            }
        }
    };
    var chart = new Chart(ctx, config);
}

angular
    .module('app')
    .controller('BirdController', BirdController)
    .filter('trustUrl', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    });