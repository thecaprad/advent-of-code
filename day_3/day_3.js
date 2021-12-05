export function normalizeData(data) {
    var result = data.map(function(d) {
        return d.split('');
    })
    // [[0, 0, 1, 0, 0], [1, 1, 1, 0, 0], etc.]
    return result;
}

function getColumnSums(lists) {
    // Given a list of equal-lengthed lists of integers, returns a single
    // list with sum of each column. [[0, 0, 1], [1, 0, 1]] --> [1, 0, 2].
    var result = lists[0].map(function() {
        return 0;
    });
    for (let i = 0; i < lists.length; i++) {
        for (let n = 0; n < lists[0].length; n++) {
            result[n] += parseInt(lists[i][n]);
        }
    }
    return result;
}

function calculateMostCommonBinary(list, inputLength, opposite = true) {
    // Given a list of integers, returns a new list of the same length
    // where each place is 1 if the given int is more than half the length
    // of the input length. Otherwise it's 0.
    // [7, 5, 8, 7, 5] --> [1, 0, 1, 1, 0].
    var result = list.slice();
    for (let i = 0; i < list.length; i++) {
        if (list[i] == inputLength / 2) {
            result[i] = opposite ? 0 : 1;
        } else {
            result[i] = list[i] > inputLength / 2 ? 1 : 0;
            if (opposite) {
                result[i] = result[i] == 1 ? 0 : 1;
            }
        }
    }
    return result;
}

function convertBinaryArrayToString(list, inputLength) {
    // Convert byte arrays to concatenated string.
    // [1, 0, 1, 0, 0] --> '10100.'
    var result = '';
    for (let i = 0; i < list.length; i++) {
        result += list[i].toString();
    }
    return result;
}

export function solutionA(data) {
    var binaryColumnSums = getColumnSums(data);
    var rawGamaByte = calculateMostCommonBinary(binaryColumnSums, data.length, false);
    var rawEpsilonByte = calculateMostCommonBinary(binaryColumnSums, data.length, true);
    var gamaBinaryString = convertBinaryArrayToString(rawGamaByte, data.length);
    var epsilonBinaryString = convertBinaryArrayToString(rawEpsilonByte, data.length);
    return parseInt(gamaBinaryString, 2) * parseInt(epsilonBinaryString, 2);
}
