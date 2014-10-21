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
(function(angular, crossfilter) {
    var ngDasbhoard = angular.module('ngDashboard');

    ngDasbhoard.provider('widgetGroupLayout', [

        function() {

            var layoutManagers = {};

            this.registerLayoutManager = function(name, layoutManager) {
                layoutManagers[name] = layoutManager;
            };

            this.$get = ['$injector',

                function($inject) {
                    angular.forEach(layoutManagers, function(layoutManager) {
                        if (layoutManager.initialize) {
                            $inject.invoke(layoutManager.initialize, layoutManager);
                        }
                    });

                    return {
                        handleLayout: function(widgetGroupElement, groupData) {
                            var layout = (groupData.layout && groupData.layout.type) ? groupData.layout.type : 'flow';

                            if (!layoutManagers[layout]) {
                                throw 'No LayoutManager ' + layout + ' registered';
                            }

                            layoutManagers[layout].layout(widgetGroupElement, groupData);
                        }
                    };
                }
            ];
        }
    ]);

    ngDasbhoard.directive('widgetGroup', ['widgetGroupLayout',

        function(widgetGroupLayout) {

            return {
                restrict: 'E',
                scope: {
                    groupData: '=groupData'
                },
                controller: ['$scope', '$http', 'crossfilterUtils',
                    function($scope, $http, crossfitlerUtils) {
                        var initializers = [],
                            initialized = false;

                        this.registerWidgetInitializer = function(initializer) {
                            if (initialized) {
                                initializer($scope.crossFilter, $scope.namedGroups, $scope.groupData.name);
                            } else {
                                initializers.push(initializer);
                            }
                        };

                        function initializeWidgets() {
                            initialized = true;

                            for (var i in initializers) {
                                initializers[i]($scope.crossFilter, $scope.namedGroups, $scope.groupData.name, $scope.rawData);
                            }

                            initializers.length = 0;
                        }


                        if (angular.isArray($scope.groupData.data)) {
                            $scope.rawData = $scope.groupData.data;
                            $scope.crossFilter = crossfilter($scope.groupData.data);
                            $scope.namedGroups = buildNamedGroups($scope.groupData.groups, $scope.crossFilter, crossfitlerUtils);
                            initializeWidgets();
                        } else if (angular.isString($scope.groupData.dataUrl)) {
                            $http({
                                method: 'GET',
                                url: $scope.groupData.dataUrl
                            })
                                .success(function(data) {
                                    $scope.rawData = data;
                                    $scope.crossFilter = crossfilter(data);
                                    $scope.namedGroups = buildNamedGroups($scope.groupData.groups, $scope.crossFilter, crossfitlerUtils);
                                    initializeWidgets();
                                })
                                .error(function(error) {
                                    throw error;
                                });
                        } else {
                            initializeWidgets();
                        }
                    }
                ],
                link: function(scope, element) {
                    element.addClass('widget-group');

                    //call the layoutManager
                    var groupDataWatch = scope.$watch('groupData', function(groupData) {
                        if (groupData) {
                            widgetGroupLayout.handleLayout(element, groupData);

                            groupDataWatch();
                        }
                    });
                },
                template: '<div class="widget-group-header">' +
                    '<h3 ng-if="groupData.title">{{groupData.title}}</h3>' +
                    '<filter filter-data="groupFilter" widget-group-name="groupData.name" ng-class="groupFilter.type" class="group-filter" crossfilter="crossFilter" ng-repeat="groupFilter in groupData.filters"></filter>' +
                    '</div>'
            };
        }
    ]);

    function buildNamedGroups(groupsData, crossfilter, crossfitlerUtils) {
        if (groupsData && crossfilter) {
            var namedGroups = {};

            angular.forEach(groupsData, function(groupData, groupName) {
                if (!groupData.dimension) {
                    throw 'A dimension is required for named groups';
                }

                if (!groupData.group) {
                    throw 'A group is required for named groups';
                }

                var dimensionFunction = crossfitlerUtils.dimensionFunction(groupData.dimension);
                var dimension = crossfilter.dimension(dimensionFunction);

                var grouping = crossfitlerUtils.groupFunctions(groupData.group);
                var group = dimension.group().reduce(grouping.add, grouping.remove, grouping.init);

                namedGroups[groupName] = {
                    dimension: dimension,
                    group: group
                };
            });

            return namedGroups;
        }
    }
})(angular, crossfilter);