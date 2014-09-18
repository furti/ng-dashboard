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
            widgetFactoryProvider.registerWidgetProvider('piechart', new PieChartProvider());
        }
    ]);

    function PieChartProvider() {}

    PieChartProvider.prototype.initialize = ['baseChartMixin', 'invokeIfDefined', 'colorMixin',
        function(baseChartMixin, invokeIfDefined, colorMixin) {
            this.baseChartMixin = baseChartMixin;
            this.invokeIfDefined = invokeIfDefined;
            this.colorMixin = colorMixin;
        }
    ];

    PieChartProvider.prototype.createWidget = function(element, widgetData) {
        var chart = dc.pieChart(element[0], widgetData.widgetGroupName);
        var invoke = this.invokeIfDefined;
        var raw = widgetData.rawData;

        this.baseChartMixin.configureChart(chart, widgetData);
        this.colorMixin.configureChart(chart, widgetData);

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