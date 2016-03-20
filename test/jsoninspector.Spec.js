define(
    [
        '../src/jsoninspector'
    ],
    function(jsonInspector) {
    'use strict';

    function getData_1(val) {
        return {
            node:{
                node:{
                    value: val
                }
            }
        };
    }

    function getData_2(val) {
        return {
            node:{
                node:{
                    list:[
                        {},
                        val
                    ]
                }
            }
        };
    }

    function getData_3(val) {
        return {
            node:{
                node:{
                    list:[
                        {
                            node:{
                                value: val
                            }
                        }
                    ]
                }
            }
        };
    }


    describe('Json Inspector', function() {
        it('should allow access to a value several objects deep', function() {
            expect(jsonInspector(getData_1('some value') , '$.node.node.value')).toBe('some value');
        });

        it('should return undefined if the path is invalid', function() {
            expect(jsonInspector(getData_1('some value')  , '$.node.hamster.value')).toBeUndefined();
        });

        it('should deal correctly with falsy values', function() {
            expect(jsonInspector(getData_1(0)  , '$.node.node.value')).toBe(0);
            expect(jsonInspector(getData_1(false) , '$.node.node.value')).toBe(false);
            expect(jsonInspector(getData_1(null) , '$.node.node.value')).toBe(null);
            expect(jsonInspector(getData_1('') , '$.node.node.value')).toBe('');
        });

        it('should be able to extract values from arrays', function() {
            expect(jsonInspector(getData_2('some value')  , '$.node.node.list[1]')).toBe('some value');
        });

        it('should be able to deal with objects nested in arrays', function() {
            expect(jsonInspector(getData_3('some value')  , '$.node.node.list[0].node.value')).toBe('some value');
        });

        it('should be able to deal with arrays nested in arrays', function() {
            expect(jsonInspector(getData_3([['some value']])  , '$.node.node.list[0].node.value[0][0]')).toBe('some value');
        });

        it('should be able to deal with arrays nested in arrays', function() {
            expect(jsonInspector(getData_3([['some value']])  , '$.node.node.list[0].node.value[0][2]')).toBeUndefined();
        });
    });

});