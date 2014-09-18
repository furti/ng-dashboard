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
describe('Crossfilter Utils', function() {
    var crossfilterUtils;

    beforeEach(module('ngDashboard'));
    beforeEach(inject(function(_crossfilterUtils_) {
        crossfilterUtils = _crossfilterUtils_;
    }));

    var data = [{
        a: 1,
        b: 5,
        c: 7
    }, {
        a: 6,
        b: 3,
        c: 8
    }, {
        a: 8,
        b: 3,
        c: 2
    }, {
        a: 6,
        b: 7,
        c: 8
    }];

    it('Distinct values', function() {
        var filter = crossfilter(data);
        var dimension = filter.dimension(function(d) {
            return d.a;
        });

        var actual = crossfilterUtils.getDistinctValuesFromDimension(dimension);

        expect(actual).toEqual([1, 6, 8]);
    });
});