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
describe('Sumgroup Provider', function() {

    var crossfilterUtils,
        groupData = {
            type: 'sum',
            parameters: {
                value: 'v.val'
            }
        };

    beforeEach(function() {
        module('ngDashboard');

        inject(function(_crossfilterUtils_) {
            crossfilterUtils = _crossfilterUtils_;
        });
    });

    it('Init function defined', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        expect(groupFunctions.init).toBeDefined();
    });

    it('Add function defined', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        expect(groupFunctions.add).toBeDefined();
    });

    it('Remove function defined', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        expect(groupFunctions.remove).toBeDefined();
    });

    it('Init should return 0', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        expect(groupFunctions.init()).toBe(0);
    });

    it('Add should increment by value', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = 0;
        var v = {
            val: 4
        };

        expect(groupFunctions.add(p, v)).toBe(4);
    });

    it('Remove should decrement by value', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = 7;
        var v = {
            val: 4
        };

        expect(groupFunctions.remove(p, v)).toBe(3);
    });
});