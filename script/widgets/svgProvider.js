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
            widgetFactoryProvider.registerWidgetProvider('svg', new SvgProvider());
        }
    ]);


    function SvgProvider() {}

    SvgProvider.prototype.createWidget = function(element, widgetData) {
        var svg = d3.select(element[0]).append('svg');

        var raw = widgetData.rawData;

        if (raw.width) {
            svg.attr('width', raw.width);
        }

        if (raw.height) {
            svg.attr('height', raw.height);
        }

        this.handleElements(svg, raw.elements);

        return svg;
    };

    SvgProvider.prototype.handleElements = function(parent, elements) {
        var svgProvider = this;

        angular.forEach(elements, function(element) {
            var node = parent.append(element.type);


            svgProvider.handleAttributes(node, element);

            if (element.elements) {
                svgProvider.handleElements(node, element.elements);
            }
        });
    };

    SvgProvider.prototype.handleAttributes = function(node, attributes) {
        angular.forEach(attributes, function(value, key) {
            if (key !== 'elements' && key !== 'type') {
                node.attr(key, value);
            }
        });
    };
})(angular);