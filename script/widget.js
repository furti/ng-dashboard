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


    ngDashboard.directive('widget', ['widgetFactory',

        function(widgetFactory) {

            return {
                restrict: 'E',
                scope: {
                    widgetData: '=widgetData',
                    crossFilter: '=crossFilter'
                },
                link: function(scope, element) {
                    var widget, overlays;
                    element.addClass('widget');

                    var filterWatch = scope.$watch('crossFilter', function(newValue) {
                        if (newValue) {
                            var widgetBody = element.find('widget-body');

                            widget = createWidget(widgetBody, scope.widgetData, scope.crossFilter, widgetFactory);

                            if (scope.widgetData.overlays) {
                                overlays = [];

                                for (var i in scope.widgetData.overlays) {
                                    var overlayWidget = createWidget(widgetBody,
                                        scope.widgetData.overlays[i],
                                        scope.crossFilter,
                                        widgetFactory);

                                    overlays.push(overlayWidget);
                                }
                            }

                            filterWatch();
                        }
                    });
                },
                templateUrl: './template/widget.html'
            };
        }
    ]);

    function createWidget(element, widgetData, crossFilter, widgetFactory) {
        return widgetFactory.createWidget(element, widgetData.type, {
            crossfilter: crossFilter,
            rawData: widgetData
        });
    }
})(angular);