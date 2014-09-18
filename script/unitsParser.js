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
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('unitsParser', [

        function() {
            var unitProviders = {};

            this.registerUnitProvider = function(name, provider) {
                unitProviders[name] = provider;
            };

            this.$get = ['$injector',

                function($injector) {

                    angular.forEach(unitProviders, function(provider) {
                        if (provider.initialize) {
                            $injector.invoke(provider.initialize, provider);
                        }
                    });

                    return new UnitParser(unitProviders);
                }
            ];
        }
    ]);

    function UnitParser(unitProviders) {
        this.unitProviders = unitProviders;
    }

    UnitParser.prototype.parse = function(unitData) {
        if (!this.unitProviders[unitData.type]) {
            throw 'No scaleprovider ' + unitData.type + ' registered';
        }

        return this.unitProviders[unitData.type].createUnit(unitData.parameters);
    };
})(angular);