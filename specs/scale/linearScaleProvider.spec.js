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
describe('Create Linear scales', function() {

    var scaleParser;

    beforeEach(function() {
        module('ngDashboard');

        inject(function(_scaleParser_) {
            scaleParser = _scaleParser_;
        });
    });

    it('Scale is created', function() {
        var scale = scaleParser.parse({
            type: 'linear',
            parameters: {
                domain: [1, 10]
            }
        });

        expect(scale).toBeDefined();
    });

    it('Scale has a domain', function() {
        var scale = scaleParser.parse({
            type: 'linear',
            parameters: {
                domain: [1, 10]
            }
        });

        expect(scale.domain()).toEqual([1, 10]);
    });

    it('Scale has a range', function() {
        var scale = scaleParser.parse({
            type: 'linear',
            parameters: {
                range: [1, 5]
            }
        });

        expect(scale.range()).toEqual([1, 5]);
    });
});