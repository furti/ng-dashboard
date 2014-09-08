describe('Arraygroup Provider', function() {

    var crossfilterUtils,
        groupData = {
            type: 'array',
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

    it('Init should return a empty array', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        expect(groupFunctions.init()).toEqual([]);
    });

    it('Add should push value', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = [];
        var v = {
            val: 4
        };

        expect(groupFunctions.add(p, v)).toEqual([4]);
    });

    it('Remove should remove value', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(groupData);

        var p = [7, 4];
        var v = {
            val: 4
        };

        expect(groupFunctions.remove(p, v)).toEqual([7]);
    });
});