(function(angular) {
    var ngDashboard = angular.module('ngDashboard');
    var expressionRegex = /^([^\(]*)\(([^\)]*)\).*$/;

    ngDashboard.factory('widgetExpressionParser', ['$parse',

        function($parse) {
            return {
                /**
                 * @ngdoc method
                 * @name ngDashboard.service.widgetExpressionParser#parse
                 * @methodOf ngDashboard.service.widgetExpressionParser
                 * @description parses the expression and returns the function and parameters
                 *
                 * @return {Object} {
                 *  functionName: 'functionname',
                 *  parameters: <angular expression object>
                 * }
                 */
                parse: function(expression) {
                    var exParts = expressionRegex.exec(expression);
                    var functionName = exParts[1];
                    var functionParams = $parse(exParts[2]);

                    return {
                        functionName: functionName,
                        parameters: functionParams
                    };
                },
                valueFunction: function(expression, contextName) {
                    var getter = $parse(expression);
                    var contextProperty = contextName ? contextName : 'd';

                    function value(d) {
                        var context = {};
                        context[contextProperty] = d;

                        var val = getter(context);

                        return val;
                    }

                    return value;
                }
            };
        }
    ]);
})(angular);