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
            widgetFactoryProvider.registerWidgetProvider('bubbleoverlay', new BubbleOverlayProvider());
        }
    ]);

    function BubbleOverlayProvider() {}

    BubbleOverlayProvider.prototype.initialize = ['baseChartMixin', 'bubbleMixin', 'colorMixin', 'invokeIfDefined',
        function(baseChartMixin, bubbleMixin, colorMixin, invokeIfDefined) {
            this.baseChartMixin = baseChartMixin;
            this.bubbleMixin = bubbleMixin;
            this.invokeIfDefined = invokeIfDefined;
            this.colorMixin = colorMixin;
        }
    ];

    BubbleOverlayProvider.prototype.createWidget = function(element, widgetData) {
        var chart = dc.bubbleOverlay(element[0], widgetData.widgetGroupName),
            raw = widgetData.rawData;

        chart.svg(d3.select(element.find('svg')[0]));

        this.baseChartMixin.configureChart(chart, widgetData);
        this.bubbleMixin.configureChart(chart, widgetData);
        this.colorMixin.configureChart(chart, widgetData);

        if (raw.points) {
            for (var i in raw.points) {
                var point = raw.points[i];

                chart.point(point.name, point.x, point.y);
            }
        }

        chart.render();

        return chart;
    };
})(angular);