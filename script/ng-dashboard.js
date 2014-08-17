(function(angular) {
    var ngDashboard = angular.module('ngDashboard', []);
    /**
     * @ngdoc service
     * @name ngDashboard.service.invokeIfDefined
     * @description
     * Function that invokes a function on the target with the value of the source property if it is defined on the source.
     *
     * @param source {Object} Object to read the property that is used as parameter for the function call at the target property.
     * @param target {Object} Object that has a function named as the property argument that is invoked.
     * @param property {String} Property that is checked on existence at the source object. Also the name of the function in the target object.
     */
    ngDashboard.factory('invokeIfDefined', function() {
        return function(source, target, property) {
            if (angular.isDefined(source[property])) {
                target[property](source[property]);
            }
        }
    });
})(angular);