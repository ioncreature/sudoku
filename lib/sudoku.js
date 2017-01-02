'use strict';

const
    MAX_ATTEMPTS = 10,
    EMPTY = 0;


class Sudoku {
    constructor(field) {
        validateSudoku(field);
        this.field = clone(field);
        this.probableValues = getProbableValues();
    }


    toString() {
        return this.field
            .map(row => {
                return row.map(v => v === EMPTY ? '.' : v).join(' ');
            })
            .join('\n');
    }


    set(row, column, value) {
        if (value !== EMPTY && !isValidCellValue(value))
            throw new Error(`Invalid cell value ${value}`);

        if (this.get(row, column) === value)
            return true;

        if (value !== EMPTY && !this.canSet(row, column, value))
            return false;

        this.field[row][column] = value;
        return true;
    }


    get(row, column) {
        return this.field[row][column];
    }


    getRow(row) {
        return this.field[row];
    }


    getColumn(column) {
        return this.field.map(row => row[column]);
    }


    canSet(r, c, value) {
        return !this.rowHas(r, value) && !this.columnHas(c, value) && !this.squareHas(r, c, value);
    }


    rowHas(row, value) {
        return this.getRow(row).indexOf(value) > -1;
    }


    columnHas(column, value) {
        return this.getColumn(column).indexOf(value) > -1
    }


    squareHas(r, c, value) {
        return this.getSquareValuesFromPoint(r, c).indexOf(value) > -1;
    }


    getSquareValuesFromPoint(row, col) {
        let values = [],
            maxRow = getMaxSquareCoordinate(row),
            maxColumn = getMaxSquareCoordinate(col);

        for (let r = getMinSquareCoordinate(row); r <= maxRow; r++)
            for (let c = getMinSquareCoordinate(col); c <= maxColumn; c++)
                values.push(this.get(r, c));

        return values;
    }


    solve() {
        let attempt = 0,
            emptyCells;

        do {
            attempt ++;
            emptyCells = this.getEmptyCells();
            console.log('\nattempt', attempt);
            emptyCells.forEach(([row, column]) => {
                let probables = this.calcProbableValues(row, column);
                if (probables.length === 1) {
                    this.probableValues[row][column] = [];
                    console.log('set', row, column, probables[0]);
                    return this.set(row, column, probables[0]);
                }

                this.probableValues[row][column] = probables;
            });
            console.log(this.toString());
        }
        while (attempt < MAX_ATTEMPTS && emptyCells.length > 0);

        return {
            solved: emptyCells.length === 0,
            attempts: attempt
        };
    }


    getEmptyCells() {
        let list = [];

        for (let row = 0; row < 9; row++)
            for (let col = 0; col < 9; col++)
                if (this.isEmpty(row, col))
                    list.push([row, col]);

        return list;
    }


    isEmpty(row, column) {
        return this.get(row, column) === EMPTY;
    }


    calcProbableValues(row, column) {
        let probables = [],
            values = [
                ...this.getRow(row),
                ...this.getColumn(column),
                ...this.getSquareValuesFromPoint(row, column)
            ];

        for (let i = 1; i <= 9; i ++)
            if (values.indexOf(i) === -1)
                probables.push(i);

        return probables;
    }
}


module.exports = Sudoku;


function validateSudoku(arr) {
    if (isSudokuArray(arr) && arr.every(r => isSudokuArray(r) && r.every(v => isValidCellValue(v))))
        throw new Error('Invalid sudoku');
}


function isSudokuArray(arr) {
    return Array.isArray(arr) && arr.length === 9;
}


function isValidCellValue(val) {
    return Number.isInteger(val) && val >= 1 && val <= 9;
}


function getMaxSquareCoordinate(x) {
    if (x <= 2)
        return 2;
    if (x <= 5)
        return 5;
    return 8;
}


function getMinSquareCoordinate(x) {
    if (x <= 2)
        return 0;
    if (x <= 5)
        return 3;
    return 6;
}


function getProbableValues() {
    let arr = new Array(9);
    for (let i = 0; i < 9; i++) {
        arr[i] = new Array(9);
        for (let j = 0; j < 9; j++)
            arr[i][j] = [];
    }
    return arr;
}


function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
