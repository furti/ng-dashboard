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
            widgetFactoryProvider.registerWidgetProvider('linechart', new LineChartProvider());
        }
    ]);

    function LineChartProvider() {}

    LineChartProvider.prototype.initialize = ['baseChartMixin', 'coordinateGridMixin', 'marginMixin', 'stackMixin', 'invokeIfDefined', 'colorMixin',
        function(baseChartMixin, coordinateGridMixin, marginMixin, stackMixin, invokeIfDefined, colorMixin) {
            this.baseChartMixin = baseChartMixin;
            this.coordinateGridMixin = coordinateGridMixin;
            this.invokeIfDefined = invokeIfDefined;
            this.marginMixin = marginMixin;
            this.stackMixin = stackMixin;
            this.colorMixin = colorMixin;
        }
    ];

    LineChartProvider.prototype.createWidget = function(element, widgetData) {
        var lineChart = dc.lineChart(element[0], widgetData.widgetGroupName);

        this.baseChartMixin.configureChart(lineChart, widgetData);
        this.stackMixin.configureChart(lineChart, widgetData);
        this.coordinateGridMixin.configureChart(lineChart, widgetData);
        this.marginMixin.configureChart(lineChart, widgetData);
        this.colorMixin.configureChart(lineChart, widgetData);

        this.invokeIfDefined(widgetData.rawData, lineChart, 'renderArea');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'renderDataPoints');
        this.invokeIfDefined(widgetData.rawData, lineChart, 'interpolate');

        lineChart.render();

        return lineChart;
    };
})(angular);