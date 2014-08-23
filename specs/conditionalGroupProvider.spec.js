describe('Conditionalgroup Provider', function() {

    var crossfilterUtils,
        groupData = {
            functionName: 'conditional',
            parameters: {
                init: {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0
                },
                conditions: {
                    isA: 'v.type === "A"',
                    isB: 'v.type === "B"',
                    isC: 'v.type === "C"'
                },
                handlers: {
                    add: {
                        isA: {
                            'p.a': 'p.a + v.val'
                        },
                        isB: {
                            'p.b': 'p.b + v.val'
                        },
                        isC: {
                            'p.c': 'p.c + v.val',
                            'p.d': 'p.d + 1'
                        }
                    },
                    remove: {
                        isA: {
                            'p.a': 'p.a - v.val'
                        },
                        isB: {
                            'p.b': 'p.b - v.val'
                        },
                        isC: {
                            'p.c': 'p.c - v.val',
                            'p.d': 'p.d - 1'
                        }
                    }
                }
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

    it('Init should return object', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        expect(groupFunctions.init()).toEqual({
            a: 0,
            b: 0,
            c: 0,
            d: 0
        });
    });

    it('Add a should increment a', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = {
            a: 1,
            b: 10,
            c: 5,
            d: 0
        };

        var v = {
            val: 10,
            type: 'A'
        };

        expect(groupFunctions.add(p, v)).toEqual({
            a: 11,
            b: 10,
            c: 5,
            d: 0
        });
    });

    it('Add b should increment b', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = {
            a: 1,
            b: 10,
            c: 5,
            d: 0
        };

        var v = {
            val: 5,
            type: 'B'
        };

        expect(groupFunctions.add(p, v)).toEqual({
            a: 1,
            b: 15,
            c: 5,
            d: 0
        });
    });

    it('Add c should increment c and d', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = {
            a: 1,
            b: 10,
            c: 5,
            d: 0
        };

        var v = {
            val: 1,
            type: 'C'
        };

        expect(groupFunctions.add(p, v)).toEqual({
            a: 1,
            b: 10,
            c: 6,
            d: 1
        });
    });

    it('Remove a should decrement a', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = {
            a: 5,
            b: 10,
            c: 5,
            d: 0
        };

        var v = {
            val: 3,
            type: 'A'
        };

        expect(groupFunctions.remove(p, v)).toEqual({
            a: 2,
            b: 10,
            c: 5,
            d: 0
        });
    });

    it('Remove b should decrement b', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = {
            a: 1,
            b: 10,
            c: 5,
            d: 0
        };

        var v = {
            val: 5,
            type: 'B'
        };

        expect(groupFunctions.remove(p, v)).toEqual({
            a: 1,
            b: 5,
            c: 5,
            d: 0
        });
    });

    it('Remove c should decrement c and d', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = {
            a: 1,
            b: 10,
            c: 5,
            d: 5
        };

        var v = {
            val: 1,
            type: 'C'
        };

        expect(groupFunctions.remove(p, v)).toEqual({
            a: 1,
            b: 10,
            c: 4,
            d: 4
        });
    });
});