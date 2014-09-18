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

    ngDashboard.provider('crossfilterUtils', [

        function() {
            var groupFunctionProviders = {};

            this.addGroupFunctionProvider = function(type, provider) {
                groupFunctionProviders[type] = provider;
            };

            this.$get = ['widgetExpressionParser', '$injector',
                function(widgetExpressionParser, $injector) {
                    angular.forEach(groupFunctionProviders, function(provider) {
                        if (provider.initialize) {
                            $injector.invoke(provider.initialize, provider);
                        }
                    });


                    return {
                        dimensionFunction: function(expression) {
                            if (!expression) {
                                throw 'Expression is required to create crossfilter dimension';
                            }

                            return widgetExpressionParser.valueFunction(expression);
                        },
                        groupFunctions: function(groupData) {
                            if (!groupData) {
                                throw 'Expression is required to create crossfilter group';
                            }

                            if (!groupFunctionProviders[groupData.type]) {
                                throw 'No groupfunction provider for ' + groupData.type + ' registered';
                            }

                            return groupFunctionProviders[groupData.type].buildGroup(groupData.parameters, groupData.debug);
                        },
                        getDistinctValuesFromDimension: function(dimension) {
                            if (!dimension) {
                                return [];
                            }

                            var group = dimension.group();
                            var allValues = group.all();
                            var valueArray = [];


                            if (allValues) {
                                for (var index in allValues) {
                                    valueArray.push(allValues[index].key);
                                }
                            }

                            group.dispose();

                            return valueArray;
                        }
                    };
                }
            ];
        }
    ]);
})(angular);