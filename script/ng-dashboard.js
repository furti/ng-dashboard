/**
 * Copyright 2014 Daniel Furtlehner
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        };
    });
})(angular);