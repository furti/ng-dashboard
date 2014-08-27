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