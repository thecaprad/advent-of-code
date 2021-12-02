export function normalizeData(data) {
    var result = data.map(function(d) {
        var split = d.split(' ');
        return [split[0], parseInt(split[1], 10)];
    })
    result.splice(-1);
    // [['forward', 2], ['down', 2], etc.]
    return result;
}

export function solutionA(data) {
    var horiz = 0;
    var depth = 0;
    for (let i = 0; i < data.length; i++) {
        var d = data[i];
        if (d[0] == 'forward') {
            horiz += d[1];
        } else if (d[0] == 'up') {
            depth -= d[1];
        } else {
            depth += d[1];
        }
    }
    return horiz * depth;
}