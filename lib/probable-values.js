'use strict';


class ProbableValues {
    constructor(field) {
        this.field = field || getEmptyProbableValues();
    }


    set(row, column, values) {
        this.field[row][column] = values;
    }


    get(row, column) {
        return this.field[row][column];
    }


    reset(row, column) {
        this.field[row][column] = [];
    }


    removeFromCell(row, column, value) {
        let list = this.field[row][column],
            i = list.indexOf(value);

        if (i >= 0)
            list.splice(i, 1);
    }


    removeFromRow(row, value) {
        for (let i = 0; i <= 8; i ++)
            this.removeFromCell(row, i, value);
    }


    removeFromColumn(column, value) {
        for (let i = 0; i <= 8; i ++)
            this.removeFromCell(i, column, value);
    }


    removeFromSquare(row, column, value) {
        let points = getSquareCoordsFromPoint(row, column);
        points.forEach(([r, c]) => this.removeFromCell(r, c, value));
    }


    removeFromAdjacentCells(row, column, value) {
        this.removeFromRow(row, value);
        this.removeFromColumn(column, value);
        this.removeFromSquare(row, column, value);
    }


    getSingleProbableValue(row, column) {
        let probables = this.get(row, column),
            uniqueValue;

        uniqueValue = getUniqueValue(this.getColumnExceptPoint(row, column), probables);
        if (uniqueValue)
            return uniqueValue;

        uniqueValue = getUniqueValue(this.getRowExceptPoint(row, column), probables);
        if (uniqueValue)
            return uniqueValue;

        uniqueValue = getUniqueValue(this.getSquareExceptPoint(row, column), probables);
        if (uniqueValue)
            return uniqueValue;

        function getUniqueValue(list, values) {
            for (let i = 0; i < values.length; i++)
                if (list.every(vals => vals.indexOf(values[i]) === -1))
                    return values[i];
        }
    }


    getRow(row) {
        return this.field[row];
    }


    getColumn(column) {
        return this.field.map(row => row[column]);
    }


    getSquare(row, column) {
        return getSquareCoordsFromPoint(row, column).map(([r, c]) => this.get(r, c));
    }


    getSquareExceptPoint(row, column) {
        let coords = getSquareCoordsFromPoint(row, column).filter(([r, c]) => !(r == row && c == column));
        return coords.map(([r, c]) => this.get(r, c));
    }


    getRowExceptPoint(row, column) {
        return this.getRow(row).filter((v, c) => c !== column);
    }


    getColumnExceptPoint(row, column) {
        return this.getColumn(column).filter((v, r) => r !== row);
    }
}




module.exports = ProbableValues;


function getEmptyProbableValues() {
    let arr = new Array(9);
    for (let i = 0; i < 9; i++) {
        arr[i] = new Array(9);
        for (let j = 0; j < 9; j++)
            arr[i][j] = [];
    }

    return arr;
}


function getSquareCoordsFromPoint(row, col) {
    let coords = [],
        maxRow = getMaxSquareCoordinate(row),
        maxColumn = getMaxSquareCoordinate(col);

    for (let r = getMinSquareCoordinate(row); r <= maxRow; r++)
        for (let c = getMinSquareCoordinate(col); c <= maxColumn; c++)
            coords.push([r, c]);

    return coords;
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
