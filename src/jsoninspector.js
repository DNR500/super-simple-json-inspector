define([], function() {
    return function(jsonData, jsonPath) {
        var steps = jsonPath.replace(/\[|\]/g,'.')
            .replace(/\.\./g, '.')
            .split(".");
        var stepValue = jsonData;

        for(var i = 1, len = steps.length; i < len; i++){
            var nextStep = steps[i];
            if(!nextStep) {
                break;
            }

            if(stepValue.constructor === Array){
                stepValue = stepValue[parseInt(nextStep, 10)];
            } else {
                stepValue = stepValue[nextStep];
            }

            if(!stepValue) {
                break;
            }
        }

        return stepValue;
    };
});