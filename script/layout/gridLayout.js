(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['widgetGroupLayoutProvider',
        function(widgetGroupLayoutProvider) {
            widgetGroupLayoutProvider.registerLayoutManager('grid', new GridLayoutManager());
        }
    ]);

    var template = '<div class="widget-group-grid">' +
        '<div class="widget-group-row" ng-repeat="row in rows">' +
        '<div class="widget-group-column" ng-repeat="column in row.columns">' +
        '<widget widget-data="widget" ng-repeat="widget in column.widgets"></widget>' +
        '</div>' +
        '</div>' +
        '</div>';

    function GridLayoutManager() {}

    GridLayoutManager.prototype.initialize = ['$compile', '$rootScope',
        function($compile, $rootScope) {
            this.$compile = $compile;
            this.$rootScope = $rootScope;
        }
    ];

    GridLayoutManager.prototype.layout = function(widgetGroupElement, groupData) {
        this.checkParameters(groupData.layout);

        var layoutContainer = angular.element(template);
        widgetGroupElement.append(layoutContainer);

        var layoutScope = this.$rootScope.$new();
        layoutScope.rows = this.buildGrid(groupData);

        this.$compile(layoutContainer)(layoutScope);
    };

    GridLayoutManager.prototype.checkParameters = function(layoutParams) {
        if (!layoutParams) {
            throw 'No layoutparameters for gridLayout defined';
        }

        if (!layoutParams.columns) {
            throw 'Grid layout needs a columns parameter';
        }

        if (!layoutParams.rows) {
            throw 'Grid layout needs a rows parameter';
        }
    };

    GridLayoutManager.prototype.buildGrid = function(groupData) {
        if (!groupData) {
            return;
        }

        var rows = [];

        for (var r = 0; r < groupData.layout.rows; r++) {
            var row = {
                columns: []
            };

            for (var c = 0; c < groupData.layout.columns; c++) {
                row.columns.push({
                    widgets: []
                });
            }

            rows.push(row);
        }

        angular.forEach(groupData.widgets, function(widget) {
            checkWidgetParameters(rows, widget);

            rows[widget.gridRow].columns[widget.gridColumn].widgets.push(widget);
        });

        return rows;
    };

    function checkWidgetParameters(rows, widget) {
        if (!angular.isDefined(widget.gridRow)) {
            throw 'Widget ' + widget.name + ' does not define the gridRow';
        }

        if (!angular.isDefined(widget.gridColumn)) {
            throw 'Widget ' + widget.name + ' does not define the gridColumn';
        }

        if (rows.length <= widget.gridRow) {
            throw 'Widget ' + widget.name + ' defines the gridRow ' + widget.gridRow +
                '. But only ' + rows.length + ' (zero based) rows are available';
        }

        if (rows[widget.gridRow].columns.length <= widget.gridColumn) {
            throw 'Widget ' + widget.name + ' defines the gridColumn ' + widget.gridColumn +
                '. But only ' + rows[widget.gridRow].columns.length + ' (zero based) rows are available';
        }
    }
})(angular);