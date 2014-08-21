(function(angular) {
    var ngDashboard = angular.module('ngDashboard', []);
    /**
     * @ngdoc service
     * @name ngDashboard.service.invokeIfDefined
     * @description
     * Function that invokes a function on the target with the value of the source property if it is defined on the source.
     *
     * @param source {Object} Object to read the property that is used as parameter for the function call at the target property.
     * @param target {Object} Object that has a function named as the property argument that is invoked.
     * @param property {String} Property that is checked on existence at the source object. Also the name of the function in the target object.
     */
    ngDashboard.factory('invokeIfDefined', function() {
        return function(source, target, property) {
            if (angular.isDefined(source[property])) {
                target[property](source[property]);
            }
        };
    });
})(angular);
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
                        if (angular.isArray($scope.groupData.data)) {
                            $scope.crossFilter = crossfilter($scope.groupData.data);
                        } else if (angular.isString($scope.groupData.dataUrl)) {
                            $http({
                                method: 'GET',
                                url: $scope.groupData.dataUrl
                            })
                                .success(function(data) {
                                    $scope.crossFilter = crossfilter(data);
                                })
                                .error(function(error) {
                                    throw error;
                                });
                        } else {
                            throw 'No data array or data url specified for group ' + $scope.groupData.name;
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
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');
    var expressionRegex = /^([^\(]*)\(([^\)]*)\).*$/;

    ngDashboard.factory('widgetExpressionParser', ['$parse',

        function($parse) {
            return {
                /**
                 * @ngdoc method
                 * @name ngDashboard.service.widgetExpressionParser#parse
                 * @methodOf ngDashboard.service.widgetExpressionParser
                 * @description parses the expression and returns the function and parameters
                 *
                 * @return {Object} {
                 *  functionName: 'functionname',
                 *  parameters: <angular expression object>
                 * }
                 */
                parse: function(expression) {
                    var exParts = expressionRegex.exec(expression);
                    var functionName = exParts[1];
                    var functionParams = $parse(exParts[2]);

                    return {
                        functionName: functionName,
                        parameters: functionParams
                    };
                },
                valueFunction: function(expression) {
                    function value(d) {
                        var val = expression({
                            d: d
                        });

                        return val;
                    }

                    return value;
                }
            };
        }
    ]);
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('scaleParser', [

        function() {
            var scaleProviders = {};

            this.registerScaleProvider = function(name, provider) {
                scaleProviders[name] = provider;
            };

            this.$get = ['widgetExpressionParser', '$injector',

                function(widgetExpressionParser, $injector) {

                    angular.forEach(scaleProviders, function(provider) {
                        if (provider.initialize) {
                            $injector.invoke(provider.initialize, provider);
                        }
                    });

                    return new ScaleParser(scaleProviders, widgetExpressionParser);
                }
            ];
        }
    ]);

    function ScaleParser(scaleProviders, widgetExpressionParser) {
        this.scaleProviders = scaleProviders;
        this.widgetExpressionParser = widgetExpressionParser;
    }

    ScaleParser.prototype.parse = function(expression) {
        var scaleData = this.widgetExpressionParser.parse(expression);

        if (!this.scaleProviders[scaleData.functionName]) {
            throw 'No scaleprovider ' + scaleData.functionName + ' registered';
        }

        return this.scaleProviders[scaleData.functionName].createScale(scaleData.parameters);
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.provider('crossfilterUtils', [

        function() {
            var groupFunctionProviders = {};

            this.addGroupFunctionProvider = function(functionName, provider) {
                groupFunctionProviders[functionName] = provider;
            };


            this.$get = ['$parse', 'widgetExpressionParser',
                function($parse, widgetExpressionParser) {

                    return {
                        dimensionFunction: function(expression) {
                            if (!expression) {
                                throw 'Expression is required to create crossfilter dimension';
                            }

                            return widgetExpressionParser.valueFunction($parse(expression));
                        },
                        groupFunctions: function(expression) {
                            if (!expression) {
                                throw 'Expression is required to create crossfilter group';
                            }

                            var groupData = widgetExpressionParser.parse(expression);

                            if (!groupFunctionProviders[groupData.functionName]) {
                                throw 'No groupfunction provider for ' + groupData.functionName + ' registered';
                            }

                            return groupFunctionProviders[groupData.functionName](groupData.parameters);
                        }
                    };
                }
            ];
        }
    ]);
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('barchart', new BarChartProvider());
        }
    ]);

    function BarChartProvider() {}

    BarChartProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'marginMixin', 'invokeIfDefined',
        function(baseChartMixin, coordinateGridMixin, marginMixin, invokeIfDefined) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.invokeIfDefined = invokeIfDefined;
            this.marginMixin = marginMixin;
        }
    ];

    BarChartProvider.prototype.createWidget = function(element, widgetData) {
        var barChart = dc.barChart(element[0]);

        this.baseChartMixin.configureChart(barChart, widgetData);
        this.coordinateGridMixin.configureChart(barChart, widgetData);
        this.marginMixin.configureChart(barChart, widgetData);

        barChart.render();

        return barChart;
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('boxPlot', new BoxPlotProvider());
        }
    ]);

    function BoxPlotProvider() {}

    BoxPlotProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'marginMixin',
        function(baseChartMixin, coordinateGridMixin, marginMixin) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.marginMixin = marginMixin;
        }
    ];

    BoxPlotProvider.prototype.createWidget = function(element, widgetData) {
        var chart = dc.boxPlot(element[0]);

        this.baseChartMixin.configureChart(chart, widgetData);
        this.coordinateGridMixin.configureChart(chart, widgetData);
        this.marginMixin.configureChart(chart, widgetData);


        chart.render();

        return chart;
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('heatmap', new HeatmapProvider());
        }
    ]);

    function HeatmapProvider() {}

    HeatmapProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'marginMixin', 'colorMixin', 'invokeIfDefined',
        function(baseChartMixin, coordinateGridMixin, marginMixin, colorMixin, invokeIfDefined) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.invokeIfDefined = invokeIfDefined;
            this.marginMixin = marginMixin;
            this.colorMixin = colorMixin;
        }
    ];

    HeatmapProvider.prototype.createWidget = function(element, widgetData) {
        var chart = dc.heatMap(element[0]);

        this.baseChartMixin.configureChart(chart, widgetData);
        this.coordinateGridMixin.configureChart(chart, widgetData);
        this.marginMixin.configureChart(chart, widgetData);
        this.colorMixin.configureChart(chart, widgetData);

        chart.render();

        return chart;
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('linechart', new LineChartProvider());
        }
    ]);

    function LineChartProvider() {}

    LineChartProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'marginMixin', 'invokeIfDefined',
        function(baseChartMixin, coordinateGridMixin, marginMixin, invokeIfDefined) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.invokeIfDefined = invokeIfDefined;
            this.marginMixin = marginMixin;
        }
    ];

    LineChartProvider.prototype.createWidget = function(element, widgetData) {
        var lineChart = dc.lineChart(element[0]);

        this.baseChartMixin.configureChart(lineChart, widgetData);
        this.coordinateGridMixin.configureChart(lineChart, widgetData);
        this.marginMixin.configureChart(lineChart, widgetData);

        this.invokeIfDefined(widgetData.rawData, lineChart, 'renderArea');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'renderArea');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'brushOn');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'renderDataPoints');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'interpolate');

        lineChart.render();

        return lineChart;
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerWidgetProvider('piechart', new PieChartProvider());
        }
    ]);

    function PieChartProvider() {}

    PieChartProvider.prototype.initialize = ['baseChartMixin', 'invokeIfDefined',
        function(baseChartMixin, invokeIfDefined) {
            this.baseChartMixin = baseChartMixin;
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    PieChartProvider.prototype.createWidget = function(element, widgetData) {
        var chart = dc.pieChart(element[0]);
        var invoke = this.invokeIfDefined;
        var raw = widgetData.rawData;

        this.baseChartMixin.configureChart(chart, widgetData);

        invoke(raw, chart, 'slicesCap');
        invoke(raw, chart, 'innerRadius');
        invoke(raw, chart, 'radius');
        invoke(raw, chart, 'cx');
        invoke(raw, chart, 'cy');
        invoke(raw, chart, 'minAngleForLabel');

        chart.render();

        return chart;
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['scaleParserProvider',
        function(scaleParserProvider) {
            scaleParserProvider.registerScaleProvider('linear', new LinearScaleProvider());
        }
    ]);

    function LinearScaleProvider() {}

    LinearScaleProvider.prototype.createScale = function(scaleParams) {
        var scale = d3.scale.linear();
        var evaluatedParams = scaleParams({});

        setIfPresent(scale, evaluatedParams, 'domain');
        setIfPresent(scale, evaluatedParams, 'range');
        setIfPresent(scale, evaluatedParams, 'rangeRound');
        setIfPresent(scale, evaluatedParams, 'clamp');
        setIfPresent(scale, evaluatedParams, 'ticks');

        return scale;
    };

    function setIfPresent(scale, paramObject, name) {
        if (paramObject[name]) {
            scale[name](paramObject[name]);
        }
    }

})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('baseChartMixin', new BaseChartMixin());
        }
    ]);

    function BaseChartMixin() {}

    BaseChartMixin.prototype.initialize = ['invokeIfDefined', '$parse', 'widgetExpressionParser',
        function(invokeIfDefined, $parse, widgetExpressionParser) {
            this.invokeIfDefined = invokeIfDefined;
            this.$parse = $parse;
            this.widgetExpressionParser = widgetExpressionParser;
        }
    ];

    BaseChartMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;
        var invoke = this.invokeIfDefined;

        chart.dimension(widgetData.dimension)
            .group(widgetData.group);

        invoke(raw, chart, 'width');
        invoke(raw, chart, 'minWidth');
        invoke(raw, chart, 'height');
        invoke(raw, chart, 'minHeight');
        invoke(raw, chart, 'transitionDuration');

        if (raw.keyAccessor) {
            chart.keyAccessor(this.widgetExpressionParser.valueFunction(this.$parse(raw.keyAccessor)));
        }

        if (raw.valueAccessor) {
            chart.valueAccessor(this.widgetExpressionParser.valueFunction(this.$parse(raw.valueAccessor)));
        }

        if (raw.titleAccessor) {
            chart.title(this.widgetExpressionParser.valueFunction(this.$parse(raw.titleAccessor)));
        }


        this.setupLegend(chart, raw.legend);
    };

    BaseChartMixin.prototype.setupLegend = function(chart, legendData) {
        if (!legendData) {
            return;
        }

        var invoke = this.invokeIfDefined;
        var legend = dc.legend();

        invoke(legendData, legend, 'x');
        invoke(legendData, legend, 'y');
        invoke(legendData, legend, 'gap');
        invoke(legendData, legend, 'itemHeight');
        invoke(legendData, legend, 'horizontal');
        invoke(legendData, legend, 'legendWidth');
        invoke(legendData, legend, 'itemWidth');

        chart.legend(legend);
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('colorMixin', new ColorMixin());
        }
    ]);

    function ColorMixin() {}

    ColorMixin.prototype.initialize = ['invokeIfDefined', '$parse',
        function(invokeIfDefined, $parse) {
            this.invokeIfDefined = invokeIfDefined;
            this.$parse = $parse;
        }
    ];

    ColorMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;
        var invoke = this.invokeIfDefined;

        invoke(raw, chart, 'colorDomain');
        invoke(raw, chart, 'linearColors');
        invoke(raw, chart, 'ordinalColors');

        if (raw.colorAccessor) {
            chart.colorAccessor(colorAccessor(this.$parse(raw.colorAccessor)));
        }


        if (raw.calculateColorDomain) {
            chart.calculateColorDomain();
        }
    };

    function colorAccessor(parsedExpression) {
        function cAccessor(d, i) {
            return parsedExpression({
                d: d,
                i: i
            });
        }

        return cAccessor;
    }
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('coordinateGridMixin', new CoordinateGridMixin());
        }
    ]);

    function CoordinateGridMixin() {}

    CoordinateGridMixin.prototype.initialize = ['scaleParser', 'invokeIfDefined',
        function(scaleParser, invokeIfDefined) {
            this.scaleParser = scaleParser;
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    CoordinateGridMixin.prototype.configureChart = function(chart, widgetData) {
        var invoke = this.invokeIfDefined;
        var raw = widgetData.rawData;

        if (raw.x) {
            chart.x(this.scaleParser.parse(raw.x));
        }

        invoke(raw, chart, 'yAxisPadding');
        invoke(raw, chart, 'yAxisLabel');
        invoke(raw, chart, 'brushOn');
        invoke(raw, chart, 'elasticX');
        invoke(raw, chart, 'elasticY');
        invoke(raw, chart, 'mouseZoomable');
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('marginMixin', new MarginMixin());
        }
    ]);

    function MarginMixin() {}

    MarginMixin.prototype.initialize = ['invokeIfDefined',
        function(invokeIfDefined) {
            this.invokeIfDefined = invokeIfDefined;
        }
    ];

    MarginMixin.prototype.configureChart = function(chart, widgetData) {
        this.invokeIfDefined(widgetData.rawData, chart, 'margins');
    };
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['crossfilterUtilsProvider',
        function(crossfilterUtilsProvider) {

            crossfilterUtilsProvider.addGroupFunctionProvider('array', function(groupParams) {
                if (!groupParams) {
                    throw 'sum needs a groupParam';
                }

                return arrayGroupBuilder(groupParams);
            });
        }
    ]);

    function arrayGroupBuilder(groupParams) {
        var arrayGroup = {
            init: function() {
                return [];
            },
            add: function(p, v) {
                var val = groupParams({
                    d: v
                }).value;

                p.push(val);

                return p;
            },
            remove: function(p, v) {
                var val = groupParams({
                    d: v
                }).value;

                p.slice(p.indexOf(val), 1);

                return p;
            }
        };

        return arrayGroup;
    }
})(angular);
(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['crossfilterUtilsProvider',
        function(crossfilterUtilsProvider) {

            crossfilterUtilsProvider.addGroupFunctionProvider('sum', function(groupParams) {
                if (!groupParams) {
                    throw 'sum needs a groupParam';
                }

                return sumGroupBuilder(groupParams);
            });
        }
    ]);

    function sumGroupBuilder(groupParams) {
        var sumGroup = {
            init: function() {
                return 0;
            },
            add: function(p, v) {
                var val = groupParams({
                    d: v
                }).value;

                return p + val;
            },
            remove: function(p, v) {
                var val = groupParams({
                    d: v
                }).value;

                return p - val;
            }
        };


        return sumGroup;

    }
})(angular);