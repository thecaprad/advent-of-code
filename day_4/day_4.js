class Board {
    constructor(rows) {
        this.rows = rows;
    }
    mark_card(mark_number) {
        for (let row = 0; row < this.rows.length; row++) {
            for (let rowNum = 0; rowNum < this.rows[row].length; rowNum++) {
                if (this.rows[row][rowNum].number == mark_number) {
                    this.rows[row][rowNum].checked = true;
                }
            }
        }
    }
    score_board() {
        var result = 0;
        this.rows.map(function(row) {
            row.map(function(number) {
                result += !number.checked ? parseInt(number.number) : 0;
            })
        })
        return result;
    }

    bingo() {
        // Horrizontal check.
        var horizMatch = false;
        for (let row = 0; row < this.rows.length; row++) {
            var allChecked = true;
            for (let num = 0; num < 5; num++) {
                if (!this.rows[row][num].checked) {
                    allChecked = false;
                }
            }
            if (allChecked) {
                horizMatch = true;
            }
        }
        // Vertical check.
        var vertMatch = false;
        for (let col = 0; col < this.rows[0].length; col++){
            allChecked = true;
            for (let num = 0; num < 5; num++) {
                if (!this.rows[num][col].checked) {
                    allChecked = false;
                }
            }
            if (allChecked) {
                vertMatch = true;
            }
        }
        return horizMatch || vertMatch == true ? true : false;
    }
}

class RowNumber {
    constructor(number, checked) {
        this.number = number;
        this.checked = checked;
    }
}

export function normalizeData(data) {
    var answers = data[0].split(',').map(function(d) {
        return parseInt(d);
    })
    var rows = data.splice(1).map(function(d) {
        var result = [];
        d.split(' ').map(function(i) {
            if (i) {
                result.push(new RowNumber(i, false));
            }
        })
        return result;
    })
    var cleanRows = [];
    rows = rows.map(function(d) {
        if (d.length > 0) {
            cleanRows.push(d);
        }
    })
    var boards = []
    for (let i = 0; i < cleanRows.length; i ++) {
        if (i % 5 == 0) {
            var board = new Board([cleanRows[i]]);
        } else {
            board.rows.push(cleanRows[i]);
            if (i % 4 == 0) {
                boards.push(board);
            }
        }
    }
    return [answers, boards];
}

export function solutionA(data) {
    var answers = data[0];
    var boards = data[1];
    for (let ans = 0; ans < answers.length; ans++) {
        for (let board = 0; board < boards.length; board++) {
            if (boards[board].bingo()) {
                return boards[board].score_board() * answers[ans - 1];
            }
            boards[board].mark_card(answers[ans]);
        }
    }
}

export function solutionB(data) {
    var answers = data[0];
    var boards = data[1];
    var winningBoards = []
    for (let ans = 0; ans < answers.length; ans++) {
        for (let board = 0; board < boards.length; board++) {
            if (boards[board].bingo()) {
                if (!winningBoards.includes(boards[board])) {
                    if (boards.length - winningBoards.length == 1) {
                        return boards[board].score_board() * answers[ans - 1];
                    }
                    winningBoards.push(boards[board]);
                }
            }
            boards[board].mark_card(answers[ans]);
        }
    }
}
