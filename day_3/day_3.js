export function normalizeData(data) {
    var result = data.map(function(d) {
        return d.split('');
    })
    // [[0, 0, 1, 0, 0], [1, 1, 1, 0, 0], etc.]
    return result;
}

export function solutionA(data) {
    // [0, 0, 0, 0, 0,] — All zeros the length of a single row.
    var binaryColumnSums = data[0].map(function() {
        return 0;
    });
    var rawGamaByte = binaryColumnSums.slice(); // [0, 0, 0, 0, 0,]
    var rawEpsilonByte = binaryColumnSums.slice(); // [0, 0, 0, 0, 0]
    for (let i = 0; i < data.length; i++) {
        // Increment above zeroed-out array by each columns's binary sum.
        // binaryColumnSumns [0, 0, 0, 0, 0,] --> [7, 5, 8, 7, 5].
        for (let n = 0; n < data[0].length; n++) {
            binaryColumnSums[n] += parseInt(data[i][n]);
        }
    }
    for (let i = 0; i < rawGamaByte.length; i++) {
        // If a column's total is greater than half the length of input,
        // the most common int in that column is 1.
        // Each column in rawGamaByte is set to the most common int per column.
        // rawEpislonByte columns are set to the opposite. (0 or 1).
        // [1, 0, 1, 1, 0].
        rawGamaByte[i] = binaryColumnSums[i] > data.length / 2 ? 1 : 0;
        // Opposite of the above. [0, 1, 0, 0, 1].
        rawEpsilonByte[i] = rawGamaByte[i] == 1 ? 0 : 1;
    }
    var gamaBinaryString = '';
    var epsilonBinaryString = '';
    // Convert byte arrays to concatenated string.
    // [1, 0, 1, 0, 0] --> '10100.'
    for (let i = 0; i < rawGamaByte.length; i++) {
        gamaBinaryString += rawGamaByte[i].toString();
        epsilonBinaryString += rawEpsilonByte[i].toString();
    }
    // Convert strings to binary and multiply them.
    return parseInt(gamaBinaryString, 2) * parseInt(epsilonBinaryString, 2);
}
