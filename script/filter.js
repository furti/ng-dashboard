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
                    buildFilter: function(element, filterData, crossfilter) {
                        if (!filterData.type) {
                            throw 'A Filtertype is required';
                        }

                        if (!filterProviders[filterData.type]) {
                            throw 'No widgetGroupFilterProvider ' + filterData.type + ' registered';
                        }

                        filterProviders[filterData.type].buildFilter(element, filterData, crossfilter);
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
                    crossfilter: '=crossfilter'
                },
                link: function(scope, element) {
                    var filterWatch = scope.$watch('crossfilter', function(crossfilter) {
                        if (crossfilter) {
                            widgetGroupFilter.buildFilter(element, scope.filterData, crossfilter);

                            filterWatch();
                        }
                    });
                }
            };
        }
    ]);


})(angular);