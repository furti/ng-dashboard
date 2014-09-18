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

    ngDashboard.provider('widgetGroupFilter', function() {

        var filterProviders = {};

        this.registerWidgetGroupFilter = function(name, filterProvider) {
            filterProviders[name] = filterProvider;
        };

        this.$get = ['$injector',
            function($injector) {
                angular.forEach(filterProviders, function(provider) {
                    if (provider.initialize) {
                        $injector.invoke(provider.initialize, provider);
                    }
                });


                return {
                    buildFilter: function(element, filterData, crossfilter, widgetGroupName) {
                        if (!filterData.type) {
                            throw 'A Filtertype is required';
                        }

                        if (!filterProviders[filterData.type]) {
                            throw 'No widgetGroupFilterProvider ' + filterData.type + ' registered';
                        }

                        filterProviders[filterData.type].buildFilter(element, filterData, crossfilter, widgetGroupName);
                    }
                };
            }
        ];
    });

    ngDashboard.directive('filter', ['widgetGroupFilter',
        function(widgetGroupFilter) {

            return {
                restrict: 'E',
                scope: {
                    filterData: '=filterData',
                    crossfilter: '=crossfilter',
                    widgetGroupName: '=widgetGroupName'
                },
                link: function(scope, element) {
                    var filterWatch = scope.$watch('crossfilter', function(crossfilter) {
                        if (crossfilter) {
                            widgetGroupFilter.buildFilter(element, scope.filterData, crossfilter, scope.widgetGroupName);

                            filterWatch();
                        }
                    });
                }
            };
        }
    ]);


})(angular);