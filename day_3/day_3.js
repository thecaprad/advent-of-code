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

function getMatchingBitNumbers(input, pos, mostCommonBinaries) {
    var result = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i][pos] == mostCommonBinaries[pos]) {
            result.push(input[i]);
        }
    }
    return result;
}

function getCorrectFinalSelection(listOfTwo, pos, o2 = true) {
    if (listOfTwo.length == 1) {
        return listOfTwo[0];
    }
    if (o2) {
        return listOfTwo[0][pos] == 1 ? listOfTwo[0] : listOfTwo[1];
    } else {
        return listOfTwo[0][pos] == 0 ? listOfTwo[0] : listOfTwo[1];
    }
}

export function solutionA(data) {
    var binaryColumnSums = getColumnSums(data);
    var rawGamaByte = calculateMostCommonBinary(binaryColumnSums, data.length, false);
    var rawEpsilonByte = calculateMostCommonBinary(binaryColumnSums, data.length, true);
    var gamaBinaryString = convertBinaryArrayToString(rawGamaByte, data.length);
    var epsilonBinaryString = convertBinaryArrayToString(rawEpsilonByte, data.length);
    return parseInt(gamaBinaryString, 2) * parseInt(epsilonBinaryString, 2);
}

export function solutionB(data) {
    // O2 rating.
    var considerThese = data;
    var pos = 0;
    while (considerThese.length > 2) {
        var binaryColumnSums = getColumnSums(considerThese);
        var mostCommonBinaries = calculateMostCommonBinary(binaryColumnSums, considerThese.length, false);
        considerThese = getMatchingBitNumbers(considerThese, pos, mostCommonBinaries);
        pos++;
    };
    var oxygenRatingBinaryString = convertBinaryArrayToString(getCorrectFinalSelection(considerThese, pos));
    // // CO2 rating.
    var considerThese = data;
    var pos = 0;
    while (considerThese.length > 2) {
        var binaryColumnSums = getColumnSums(considerThese);
        var leastCommonBinaries = calculateMostCommonBinary(binaryColumnSums, considerThese.length, true);
        considerThese = getMatchingBitNumbers(considerThese, pos, leastCommonBinaries);
        pos++;
    };
    var co2RatingBinaryString = convertBinaryArrayToString(getCorrectFinalSelection(considerThese, pos, false));
    return parseInt(oxygenRatingBinaryString, 2) * parseInt(co2RatingBinaryString, 2);
}
