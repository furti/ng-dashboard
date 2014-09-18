/**
 * Copyright 2014 Daniel Furtlehner
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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