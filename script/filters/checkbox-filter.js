(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetGroupFilterProvider',
        function(widgetGroupFilterProvider) {
            widgetGroupFilterProvider.registerWidgetGroupFilter('checkbox', new CheckboxFilter());
        }
    ]);

    var template = '<span ng-repeat="value in values">' +
        '<label>{{value.label}}</label>' +
        '<input type="checkbox" ng-click="filterChanged(value.key)">' +
        '</span>';

    function CheckboxFilter() {}

    CheckboxFilter.prototype.initialize = ['$compile', '$rootScope', 'crossfilterUtils', '$parse',
        function($compile, $rootScope, crossfilterUtils, $parse) {
            this.$compile = $compile;
            this.$rootScope = $rootScope;
            this.crossfilterUtils = crossfilterUtils;
            this.$parse = $parse;
        }
    ];

    CheckboxFilter.prototype.buildFilter = function(element, filterData, crossfilter, widgetGroupName) {
        var dimension = crossfilter.dimension(this.crossfilterUtils.dimensionFunction(filterData.dimension));
        var data = this.setupData(filterData, dimension);

        var filterElement = angular.element(template);
        element.append(filterElement);

        var filterScope = this.$rootScope.$new();
        filterScope.values = data.values;

        filterScope.filterChanged = function(value) {
            data.appliedFilters[value] = !data.appliedFilters[value];

            if (data.appliedFilters[value]) {
                data.appliedFilters._filtercount_++;
            } else {
                data.appliedFilters._filtercount_--;
            }

            dimension.filter(function(d) {
                return data.appliedFilters._filtercount_ === 0 || data.appliedFilters[d];
            });

            dc.redrawAll(widgetGroupName);
        };

        this.$compile(filterElement)(filterScope);
    };

    CheckboxFilter.prototype.setupData = function(filterData, dimension) {
        var index, value, labelGetter,
            values = this.crossfilterUtils.getDistinctValuesFromDimension(dimension),
            calculatedValues = [];

        if (filterData.labelAccessor) {
            labelGetter = this.$parse(filterData.labelAccessor);
        } else {
            labelGetter = function(d) {
                return d;
            };
        }

        var appliedFilters = {
            _filtercount_: 0
        };

        for (index in values) {
            value = values[index];
            appliedFilters[value] = false;
            calculatedValues.push({
                key: value,
                label: labelGetter({
                    v: value
                })
            });
        }

        return {
            appliedFilters: appliedFilters,
            values: calculatedValues
        };
    };
})(angular);