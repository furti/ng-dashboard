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

    ngDashboard.config(['widgetGroupFilterProvider',
        function(widgetGroupFilterProvider) {
            widgetGroupFilterProvider.registerWidgetGroupFilter('select', new SelectFilter());
        }
    ]);

    var template = '<label>{{filterData.title}}</label>' +
        '<select ng-model="selected" ng-options="value for value in values" ng-change="filterChanged()">' +
        '<option value="">{{filterData.allTitle}}</option>' +
        '</select>';

    function SelectFilter() {}

    SelectFilter.prototype.initialize = ['$compile', '$rootScope', 'crossfilterUtils',
        function($compile, $rootScope, crossfilterUtils) {
            this.$compile = $compile;
            this.$rootScope = $rootScope;
            this.crossfilterUtils = crossfilterUtils;
        }
    ];

    SelectFilter.prototype.buildFilter = function(element, filterData, crossfilter, widgetGroupName) {
        var filterElement = angular.element(template);
        element.append(filterElement);

        var dimension = crossfilter.dimension(this.crossfilterUtils.dimensionFunction(filterData.dimension));

        var filterScope = this.$rootScope.$new();
        filterScope.filterData = filterData;
        filterScope.values = this.crossfilterUtils.getDistinctValuesFromDimension(dimension);

        filterScope.filterChanged = function() {
            if (!filterScope.selected || filterScope.selected === '') {
                dimension.filter(null);
            } else {
                dimension.filter(filterScope.selected);
            }
            dc.redrawAll(widgetGroupName);
        };

        this.$compile(filterElement)(filterScope);
    };
})(angular);