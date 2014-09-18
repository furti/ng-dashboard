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
describe('Conditionalgroup Provider', function() {

    var crossfilterUtils,
        groupData = {
            type: 'conditional',
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

    var preGroupData = {
        type: 'conditional',
        parameters: {
            conditions: {
                aCheck: 'v.type === "C"'
            },
            handlers: {
                add: {
                    pre: {
                        'p.c': 'p.c * v.val'
                    },
                    aCheck: {
                        'p.c': 'p.c + v.val'
                    }
                },
                remove: {
                    pre: {
                        'p.c': 'p.c - v.val'
                    },
                    aCheck: {
                        'p.c': 'p.c / v.val'
                    }
                }
            }
        }
    };

    var postGroupData = {
        type: 'conditional',
        parameters: {
            conditions: {
                aCheck: 'v.type === "C"'
            },
            handlers: {
                add: {
                    aCheck: {
                        'p.c': 'p.c + v.val'
                    },
                    post: {
                        'p.c': 'p.c * v.val'
                    }
                },
                remove: {
                    aCheck: {
                        'p.c': 'p.c / v.val'
                    },
                    post: {
                        'p.c': 'p.c - v.val'
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

    it('Pre handlers should be called before others when adding', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(preGroupData);

        var p = {
            a: 1,
            b: 10,
            c: 6,
            d: 5
        };

        var v = {
            val: 2,
            type: 'C'
        };

        expect(groupFunctions.add(p, v)).toEqual({
            a: 1,
            b: 10,
            c: 14,
            d: 5
        });
    });

    it('Pre handlers should be called before others when removing', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(preGroupData);

        var p = {
            a: 1,
            b: 10,
            c: 14,
            d: 5
        };

        var v = {
            val: 2,
            type: 'C'
        };

        expect(groupFunctions.remove(p, v)).toEqual({
            a: 1,
            b: 10,
            c: 6,
            d: 5
        });
    });

    it('post handlers should be called after others when adding', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(postGroupData);

        var p = {
            a: 1,
            b: 10,
            c: 5,
            d: 5
        };

        var v = {
            val: 3,
            type: 'C'
        };

        expect(groupFunctions.add(p, v)).toEqual({
            a: 1,
            b: 10,
            c: 24,
            d: 5
        });
    });

    it('post handlers should be called after others when removing', function() {
        var groupFunctions = crossfilterUtils.groupFunctions(postGroupData);

        var p = {
            a: 1,
            b: 10,
            c: 24,
            d: 5
        };

        var v = {
            val: 3,
            type: 'C'
        };

        expect(groupFunctions.remove(p, v)).toEqual({
            a: 1,
            b: 10,
            c: 5,
            d: 5
        });
    });
});