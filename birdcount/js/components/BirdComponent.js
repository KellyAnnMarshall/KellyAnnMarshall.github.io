/**
 * Below (commented out) are other supported
 * properties of the .component() method
 *
 * Remember: bindings: {} is a wrapper
 * for bindToController and scope: {}
 * so you never access $scope directly.
 * "$ctrl" is the default controllerAs name.
 */
var BirdComponent = {
	// templateUrl
	// controllerAs
	// transclude: true,
	// require: {
	//	 parent: '^^parent'
	// },
	bindings: {
	},
	templateUrl: "js/templates/BirdTemplate.html",
	controller: "js/controllers/BirdController.js"
};

angular
	.module('app')
	.component('birdComponent', BirdComponent);
