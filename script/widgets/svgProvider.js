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