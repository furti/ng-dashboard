(function(angular) {
    var europeGroup = {
        title: 'Members of the European parliament',
        name: 'europe',
        dataUrl: './sample/data/europe.json',
        widgets: [{
            title: 'By Group',
            name: 'group',
            type: 'piechart',
            width: 200,
            height: 200,
            dimension: 'd.eugroup',
            group: {
                functionName: 'sum',
                parameters: {
                    value: '1'
                }
            },
            innerRadius: 20,
            radius: 70,
            colors: {
                type: 'category10'
            }
        }, {
            title: 'By Country',
            name: 'coountry',
            type: 'barchart',
            width: 544,
            height: 200,
            dimension: 'd.country',
            x: {
                type: 'ordinal'
            },
            xUnits: {
                type: 'ordinal'
            },
            group: {
                functionName: 'sum',
                parameters: {
                    value: '1'
                }
            },
            margins: {
                top: 10,
                right: 10,
                bottom: 95,
                left: 50
            },
            elasticY: true,
            yAxisLabel: '#MEPs',
            brushOn: false,
            outerPadding: 0,
            gap: 1
        }]
    };

    angular.module('dashboard')
        .constant('europe', europeGroup);

})(angular);