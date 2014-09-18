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

    ngDashboard.config(['widgetGroupLayoutProvider',
        function(widgetGroupLayoutProvider) {
            widgetGroupLayoutProvider.registerLayoutManager('flow', new FlowLayoutManager());
        }
    ]);

    var template = '<div class="widget-group-flow">' +
        '<widget widget-data="widget" ng-repeat="widget in groupData.widgets"></widget>' +
        '</div>';

    function FlowLayoutManager() {}

    FlowLayoutManager.prototype.initialize = ['$compile', '$rootScope',
        function($compile, $rootScope) {
            this.$compile = $compile;
            this.$rootScope = $rootScope;
        }
    ];

    FlowLayoutManager.prototype.layout = function(widgetGroupElement, groupData) {
        var layoutContainer = angular.element(template);
        widgetGroupElement.append(layoutContainer);

        var layoutScope = this.$rootScope.$new();
        layoutScope.groupData = groupData;

        this.$compile(layoutContainer)(layoutScope);
    };
})(angular);