(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    function WidgetFactory(widgetProviders) {
        this.widgetProviders = widgetProviders;
    }

    /**
     * @param {Object} widgetData {
     *  dimension: crossfilter.dimension,
     *  group: dimension.group,
     *  rawData: {...} //The raw widget data specified by the application
     * }
     */
    WidgetFactory.prototype.createWidget = function(element, type, widgetData) {
        if (!this.widgetProviders[type]) {
            throw 'No widget with ' + type + ' registered';
        }

        return this.widgetProviders[type].createWidget(element, widgetData);
    };

    ngDashboard.provider('widgetFactory', [

        function() {
            var widgetProviders = {};
            var mixins = {};

            this.registerWidgetProvider = function(name, provider) {
                widgetProviders[name] = provider;
            };

            this.registerChartMixin = function(name, mixin) {
                mixins[name] = mixin;
            };

            this.$get = ['$injector',

                function($injector) {
                    angular.forEach(mixins, function(mixin) {
                        if (mixin.initialize) {
                            $injector.invoke(mixin.initialize, mixin);
                        }
                    });

                    angular.forEach(widgetProviders, function(widgetProvider) {
                        if (widgetProvider.initialize) {
                            $injector.invoke(widgetProvider.initialize, widgetProvider, mixins);
                        }
                    });

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
                link: function(scope, element) {
                    var widget, dim, group;
                    element.addClass('widget');

                    var filterWatch = scope.$watch('crossFilter', function(newValue) {
                        if (newValue) {
                            dim = scope.crossFilter.dimension(crossfilterUtils.dimensionFunction(scope.widgetData.dimension));

                            var grouping = crossfilterUtils.groupFunctions(scope.widgetData.group);
                            group = dim.group().reduce(grouping.add, grouping.remove, grouping.init);

                            widget = widgetFactory.createWidget(element.find('widget-body'), scope.widgetData.type, {
                                dimension: dim,
                                group: group,
                                rawData: scope.widgetData
                            });

                            filterWatch();
                        }
                    });
                },
                templateUrl: './template/widget.html'
            };
        }
    ]);
})(angular);