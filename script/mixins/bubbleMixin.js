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
            widgetFactoryProvider.registerChartMixin('bubbleMixin', new BubbleMixin());
        }
    ]);

    function BubbleMixin() {}

    BubbleMixin.prototype.initialize = ['scaleParser', 'widgetExpressionParser',
        function(scaleParser, widgetExpressionParser) {
            this.scaleParser = scaleParser;
            this.widgetExpressionParser = widgetExpressionParser;
        }
    ];

    BubbleMixin.prototype.configureChart = function(chart, widgetData) {
        var raw = widgetData.rawData;
        //        var invoke = this.invokeIfDefined;

        if (raw.r) {
            chart.r(this.scaleParser.parse(raw.r));
        }

        if (raw.radiusValueAccessor) {
            chart.radiusValueAccessor(this.widgetExpressionParser.valueFunction(raw.radiusValueAccessor));
        }
    };
})(angular);