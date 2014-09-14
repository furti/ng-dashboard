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