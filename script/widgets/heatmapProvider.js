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
        var chart = dc.heatMap(element[0], widgetData.widgetGroupName);

        this.baseChartMixin.configureChart(chart, widgetData);
        this.coordinateGridMixin.configureChart(chart, widgetData);
        this.marginMixin.configureChart(chart, widgetData);
        this.colorMixin.configureChart(chart, widgetData);

        chart.render();

        return chart;
    };
})(angular);