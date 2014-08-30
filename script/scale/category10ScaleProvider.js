(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['scaleParserProvider',
        function(scaleParserProvider) {
            scaleParserProvider.registerScaleProvider('category10', new Category10ScaleProvider());
        }
    ]);

    function Category10ScaleProvider() {}

    Category10ScaleProvider.prototype.createScale = function(scaleParams) {
        var scale = d3.scale.category10();

        return scale;
    };
})(angular);