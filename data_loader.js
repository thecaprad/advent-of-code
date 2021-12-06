import * as solutions from '../day_3/day_3.js';

document.addEventListener('DOMContentLoaded', function() {
    var run = document.getElementById('run');
    run.addEventListener('click', function() {
        // Ho, ho ho!
        console.log('pingo express');
        // Load the data.
        let file = document.getElementById('input').files[0];
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = function() {
            // Normalize data for solution.
            let data = solutions.normalizeData(fileReader.result.split('\n'));
            // Load solutions.
            console.log(solutions.solutionA(data));
            console.log(solutions.solutionB(data));
        }
    })
})