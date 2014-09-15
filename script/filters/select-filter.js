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