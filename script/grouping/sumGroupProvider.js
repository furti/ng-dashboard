(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['crossfilterUtilsProvider',
        function(crossfilterUtilsProvider) {

            crossfilterUtilsProvider.addGroupFunctionProvider('sum', function(groupParams) {
                if (!groupParams) {
                    throw 'sum needs a groupParam';
                }

                return sumGroupBuilder(groupParams);
            });
        }
    ]);

    function sumGroupBuilder(groupParams) {
        var sumGroup = {
            init: function() {
                return 0;
            },
            add: function(p, v) {
                var val = groupParams(v).value;

                return p + val;
            },
            remove: function(p, v) {
                var val = groupParams(v).value;

                return p - val;
            }
        };


        return sumGroup;

    }
})(angular);