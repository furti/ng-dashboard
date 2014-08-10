(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    function WidgetFactory(widgetProviders) {
        this.widgetProviders = widgetProviders;
    }

    WidgetFactory.prototype.createWidget = function(element, widgetData) {
        if (!this.widgetProviders[widgetData.type]) {
            throw 'No widget with ' + widgetData.type + ' registered';
        }

        return this.widgetProviders[widgetData.type].createWdiget(element, widgetData);
    };

    ngDashboard.provider('widgetFactory', [

        function() {
            var widgetProviders = {};

            this.registerWidgetProvider = function(name, provider) {
                widgetProviders[name] = provider;
            };

            this.$get = [

                function() {
                    return new WidgetFactory(widgetProviders);
                }
            ];
        }
    ]);


    ngDashboard.directive('widget', ['widgetFactory', 'crossfilterUtils',

        function(widgetFactory, crossfilterUtils) {

            return {
                restrict: 'E',
                scope: {
                    widgetData: '=widgetData',
                    crossFilter: '=crossFilter'
                },
                link: function(scope, element, attrs) {
                    var widget, dim, group;
                    element.addClass('widget');

                    var filterWatch = scope.$watch('crossFilter', function(newValue) {
                        if (newValue) {
                            dim = scope.crossFilter.dimension(crossfilterUtils.dimensionFunction(scope.widgetData.dimension));

                            var grouping = crossfilterUtils.groupFunctions(scope.widgetData.group);
                            group = dim.group().reduce(grouping.add, grouping.remove, grouping.init);

                            filterWatch();
                        }
                    });

                    //                            chart = chartFactory.createChart(element, newValue);
                },
                templateUrl: './template/widget.html'
            };
        }
    ]);
})(angular);