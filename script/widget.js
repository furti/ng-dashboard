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
                    widgetData: '=widgetData'
                },
                require: '^widgetGroup',
                link: function(scope, element, attrs, widgetGroupCtrl) {
                    var widget, overlays;
                    element.addClass('widget');

                    widgetGroupCtrl.registerWidgetInitializer(function(crossFilter, namedGroups, widgetGroupName, rawData) {
                        if (!widgetGroupName) {
                            throw 'widget-group name is required for charts';
                        }

                        var widgetBody = element.find('widget-body');

                        widget = createWidget(widgetBody, widgetFactory, {
                            crossfilter: crossFilter,
                            namedGroups: namedGroups,
                            rawData: scope.widgetData,
                            data: rawData,
                            widgetGroupName: widgetGroupName
                        });

                        if (scope.widgetData.overlays) {
                            overlays = [];

                            for (var i in scope.widgetData.overlays) {
                                var overlayWidget = createWidget(widgetBody, widgetFactory, {
                                    crossfilter: crossFilter,
                                    namedGroups: namedGroups,
                                    rawData: scope.widgetData.overlays[i],
                                    widgetGroupName: widgetGroupName
                                });

                                overlays.push(overlayWidget);
                            }
                        }
                    });
                },
                template: '<div class="panel panel-default">' +
                    '<div class="panel-heading" ng-if="widgetData.title">' +
                    '<h3 class="panel-title">{{widgetData.title}}</h3>' +
                    '</div>' +
                    '<widget-body class="panel-body">' +
                    '</widget-body>' +
                    '< /div>'
            };
        }
    ]);

    function createWidget(element, widgetFactory, widgetData) {
        return widgetFactory.createWidget(element, widgetData.rawData.type, widgetData);
    }
})(angular);