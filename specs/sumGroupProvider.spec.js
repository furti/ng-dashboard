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