export function normalizeData(data) {
    var result = data.map(function(d) {
        return parseInt(d, 10)
    });
    // [201, 208, 204, etc.]
    return result;
}

export function solutionA(data) {
    var result = 0;
    for (let i = 0; i <= data.length; i++) {
        if (data[i] > data[i-1]) {
            result++;
        }
    }
    return result
}

export function solutionB(data) {
    var result = 0;
    for (let i = 0; i <= data.length; i++) {
        if (Boolean(data[i + 3])) {
            if ((data[i + 3] + data[i + 2] + data[i + 1]) > (data[i + 2] + data[i + 1] + data[i])) {
                result++;
            }
        }
    }
    return result;
}