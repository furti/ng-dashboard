(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['crossfilterUtilsProvider',
        function(crossfilterUtilsProvider) {

            crossfilterUtilsProvider.addGroupFunctionProvider('array', function(groupParams) {
                if (!groupParams) {
                    throw 'sum needs a groupParam';
                }

                return arrayGroupBuilder(groupParams);
            });
        }
    ]);

    function arrayGroupBuilder(groupParams) {
        var arrayGroup = {
            init: function() {
                return [];
            },
            add: function(p, v) {
                var val = groupParams({
                    d: v
                }).value;

                p.push(val);

                return p;
            },
            remove: function(p, v) {
                var val = groupParams({
                    d: v
                }).value;

                p.slice(p.indexOf(val), 1);

                return p;
            }
        };

        return arrayGroup;
    }
})(angular);