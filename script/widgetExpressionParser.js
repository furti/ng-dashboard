(function(angular) {
    var ngDashboard = angular.module('ngDashboard');
    var expressionRegex = /^([^\(]*)\(([^\)]*)\).*$/;

    ngDashboard.factory('widgetExpressionParser', [

        function() {
            return {
                /**
                 * @ngdoc method
                 * @name ngDashboard.service.widgetExpressionParser#parse
                 * @methodOf ngDashboard.service.widgetExpressionParser
                 * @description parses the expression and returns the function and parameters
                 *
                 * @return {Object} {
                 *  functionName: 'functionname',
                 *  parameters: {
                 *      param1: 'value',
                 *      param2: 1,
                 *      param3: [1, 2]
                 *  }
                 * }
                 */
                parse: function(expression) {
                    var exParts = expressionRegex.exec(expression);
                    var functionName = exParts[1];
                    var functionParams = angular.fromJson(exParts[2]);

                    return {
                        functionName: functionName,
                        parameters: functionParams
                    };
                }
            };
        }
    ]);
})(angular);