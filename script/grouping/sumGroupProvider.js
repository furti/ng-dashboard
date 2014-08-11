(function(angular) {
    var ngDashboard = angular.module('ngDashboard');

    ngDashboard.config(['crossfilterUtilsProvider',
        function(crossfilterUtilsProvider) {

            crossfilterUtilsProvider.addGroupFunctionProvider('sum', function(groupParams) {
                if (!groupParams || !groupParams.value) {
                    throw 'sum needs a groupParam called value';
                }

                return sumGroupBuilder(groupParams.value);
            });
        }
    ]);

    function sumGroupBuilder(valueGetter) {
        var sumGroup = {
            init: function() {
                return 0;
            },
            add: function(p, v) {
                var val = valueGetter({
                    d: v
                });

                return p + val;
            },
            remove: function(p, v) {
                var val = valueGetter({
                    d: v
                });

                return p - val;
            }
        };


        return sumGroup;

    }
})(angular);