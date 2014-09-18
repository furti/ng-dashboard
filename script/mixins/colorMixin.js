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

    ngDashboard.config(['widgetFactoryProvider',
        function(widgetFactoryProvider) {
            widgetFactoryProvider.registerChartMixin('colorMixin', new ColorMixin());
        }
    ]);

    function ColorMixin() {}

    ColorMixin.prototype.initialize = ['invokeIfDefined', '$parse', 'scaleParser',
        function(invokeIfDefined, $parse, scaleParser) {
            this.invokeIfDefined = invokeIfDefined;
            this.$parse = $parse;
            this.scaleParser = scaleParser;
        }
    ];

    ColorMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;
        var invoke = this.invokeIfDefined;

        invoke(raw, chart, 'colorDomain');
        invoke(raw, chart, 'linearColors');
        invoke(raw, chart, 'ordinalColors');

        if (raw.colors) {
            chart.colors(this.scaleParser.parse(raw.colors));
        }

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