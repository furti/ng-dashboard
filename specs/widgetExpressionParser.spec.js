describe('Test widgetExpressionParser', function() {
    var widgetExpressionParser;

    beforeEach(module('ngDashboard'));
    beforeEach(inject(function(_widgetExpressionParser_) {
        widgetExpressionParser = _widgetExpressionParser_;
    }));

    it('valueFunction is defined', function() {
        var expression = 'd.value';
        var valueFunction = widgetExpressionParser.valueFunction(expression);

        expect(valueFunction).toBeDefined();
    });

    it('valueFunction returns the value', function() {
        var expression = 'd.value';
        var d = {
            type: 'A',
            value: 1
        };
        var valueFunction = widgetExpressionParser.valueFunction(expression);

        expect(valueFunction(d)).toBe(1);
    });

    it('valueFunction returns the value of different context name', function() {
        var expression = 'group.value';
        var d = {
            type: 'A',
            value: 5
        };
        var valueFunction = widgetExpressionParser.valueFunction(expression, 'group');

        expect(valueFunction(d)).toBe(5);
    });
});