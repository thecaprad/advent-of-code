import { solutionA, solutionB } from '../day_1/day_1.js';

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
            let data = fileReader.result.split('\n').map(function(d) {
                return parseInt(d, 10)
            });
            // Load solutions.
            console.log(solutionA(data));
            console.log(solutionB(data));
        }
    })
})