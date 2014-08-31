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