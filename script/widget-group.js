(function(angular, crossfilter) {
    var ngDasbhoard = angular.module('ngDashboard');

    ngDasbhoard.directive('widgetGroup', [

        function() {

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
                },
                templateUrl: './template/widgetGroup.html'
            };
        }
    ]);
})(angular, crossfilter);