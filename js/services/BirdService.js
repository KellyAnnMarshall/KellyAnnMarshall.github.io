function BirdService($http) {
  function getBirds() {
      return $http
       .get('js/BirdData.json')
       .then(function(response) {
        return response.data;
      }, function (reason) {
        // error
      })
  }

  return {
    getBirds: getBirds
  };
}

angular
  .module('app')
  .factory('BirdService', BirdService);