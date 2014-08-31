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
                controller: ['$scope', '$http',
                    function($scope, $http) {
                        var initializers = [],
                            initialized = false;

                        this.registerWidgetInitializer = function(initializer) {
                            if (initialized) {
                                initializer($scope.crossFilter);
                            } else {
                                initializers.push(initializer);
                            }
                        };

                        function initializeWidgets() {
                            initialized = true;

                            for (var i in initializers) {
                                initializers[i]($scope.crossFilter);
                            }

                            initializers.length = 0;
                        }


                        if (angular.isArray($scope.groupData.data)) {
                            $scope.crossFilter = crossfilter($scope.groupData.data);
                            initializeWidgets();
                        } else if (angular.isString($scope.groupData.dataUrl)) {
                            $http({
                                method: 'GET',
                                url: $scope.groupData.dataUrl
                            })
                                .success(function(data) {
                                    $scope.crossFilter = crossfilter(data);
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
                template: '<h3 ng-if="groupData.title">{{groupData.title}}</h3>'
            };
        }
    ]);
})(angular, crossfilter);