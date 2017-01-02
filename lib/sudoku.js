'use strict';

const EMPTY = 0;

class Sudoku {
    constructor(field) {
        validateSudoku(field);
        this.field = field;
    }


    set(row, column, value) {
        validateCellValue(value);

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


    remove(row, column) {
        this.field[row][column] = EMPTY;
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


    getSquareValuesFromPoint(r, c) {
        let values = [],
            maxRow = getMaxSquareCoordinate(r),
            maxColumn = getMaxSquareCoordinate(c);

        for (let x = getMinSquareCoordinate(c); x <= maxColumn; x++)
            for (let y = getMinSquareCoordinate(r); y <= maxRow; y++)
                values.push(this.get(x, y));

        return values;
    }
}

module.exports = Sudoku;


function validateSudoku(arr) {
    if (isSudokuArray(arr) && arr.every(r => isSudokuArray(r) && r.every(v => isValidCellValue(v))))
        throw new Error('Invalid sudoku');
}


function validateCellValue( v) {
    if (v !== EMPTY && !isValidCellValue(v))
        throw new Error(`Invalid cell value ${v}`);
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