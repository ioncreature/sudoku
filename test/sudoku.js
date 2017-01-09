'use strict';

const
    expect = require('chai').expect,
    Sudoku = require('../lib/sudoku');

const
    FIELD = [
        [0, 7, 0, 3, 0, 8, 0, 6, 0],
        [6, 8, 0, 0, 4, 0, 0, 7, 9],
        [0, 0, 1, 5, 0, 0, 8, 0, 0],
        [7, 5, 0, 0, 3, 0, 0, 0, 8],
        [0, 4, 0, 6, 0, 1, 7, 3, 0],
        [1, 0, 0, 8, 7, 0, 0, 0, 2],
        [0, 0, 9, 2, 0, 6, 4, 0, 0],
        [5, 6, 0, 0, 8, 0, 0, 9, 1],
        [0, 2, 0, 9, 0, 4, 0, 5, 0]
    ];

describe('Sudoku', function() {

    describe('#constructor', function() {
        it('should create new sudoku', function() {
            new Sudoku(FIELD);
        });
    });


    describe('#get', function() {
        it('should get values', function() {
            let s = new Sudoku(FIELD);
            expect(s.get(0, 0)).to.equal(0);
            expect(s.get(0, 1)).to.equal(7);
            expect(s.get(8, 7)).to.equal(5);
            expect(s.get(3, 4)).to.equal(3);
        });
    });


    describe('#getRow', function() {
        it('should return row', function() {
            let s = new Sudoku(FIELD);
            expect(s.getRow(0)).to.deep.equal([0, 7, 0, 3, 0, 8, 0, 6, 0]);
            expect(s.getRow(2)).to.deep.equal([0, 0, 1, 5, 0, 0, 8, 0, 0]);
            expect(s.getRow(6)).to.deep.equal([0, 0, 9, 2, 0, 6, 4, 0, 0]);
        });
    });


    describe('#getColumn', function() {
        it('should return row', function() {
            let s = new Sudoku(FIELD);
            expect(s.getColumn(0)).to.deep.equal([0, 6, 0, 7, 0, 1, 0, 5, 0]);
            expect(s.getColumn(4)).to.deep.equal([0, 4, 0, 3, 0, 7, 0, 8, 0]);
            expect(s.getColumn(8)).to.deep.equal([0, 9, 0, 8, 0, 2, 0, 1, 0]);
        });
    });


    describe('#rowHas', function() {
        it('should work', function() {
            let s = new Sudoku(FIELD);
            expect(s.rowHas(0, 7)).to.equal(true);
            expect(s.rowHas(0, 1)).to.equal(false);
            expect(s.rowHas(2, 1)).to.equal(true);
            expect(s.rowHas(2, 9)).to.equal(false);
            expect(s.rowHas(6, 9)).to.equal(true);
            expect(s.rowHas(6, 1)).to.equal(false);
        });
    });


    describe('#columnHas', function() {
        it('should work', function(){
            let s = new Sudoku(FIELD);
            expect(s.columnHas(0, 6)).to.equal(true);
            expect(s.columnHas(0, 3)).to.equal(false);
            expect(s.columnHas(4, 8)).to.equal(true);
            expect(s.columnHas(4, 1)).to.equal(false);
            expect(s.columnHas(8, 2)).to.equal(true);
            expect(s.columnHas(8, 7)).to.equal(false);
        });
    });


    describe('#squareHas', function() {
        it('should work', function() {
            let s = new Sudoku(FIELD);
            expect(s.squareHas(0, 0, 6)).to.equal(true);
            expect(s.squareHas(2, 2, 6)).to.equal(true);
            expect(s.squareHas(1, 1, 2)).to.equal(false);
            expect(s.squareHas(3, 0, 4)).to.equal(true);
            expect(s.squareHas(5, 2, 5)).to.equal(true);
            expect(s.squareHas(4, 1, 8)).to.equal(false);
            expect(s.squareHas(6, 6, 4)).to.equal(true);
            expect(s.squareHas(7, 7, 9)).to.equal(true);
            expect(s.squareHas(8, 8, 7)).to.equal(false);
        });
    });


    describe('#set', function() {
        it('should not set value', function() {
            let s = new Sudoku(FIELD);
            expect(s.set(0, 0, 8)).to.equal(false);
            expect(s.get(0, 0)).to.equal(0);

            expect(s.set(0, 0, 5)).to.equal(false);
            expect(s.get(0, 0)).to.equal(0);

            expect(s.set(4, 0, 5)).to.equal(false);
            expect(s.get(4, 0)).to.equal(0);
        });


        it('should set value', function() {
            let s = new Sudoku(FIELD);

            expect(s.set(0, 0, 0)).to.equal(true);
            expect(s.get(0, 0)).to.equal(0);

            expect(s.set(0, 1, 7)).to.equal(true);
            expect(s.get(0, 1)).to.equal(7);

            expect(s.set(8, 0, 3)).to.equal(true);
            expect(s.get(8, 0)).to.equal(3);
        });
    });


    describe('#getEmptyCells', function() {
        it('should return empty cells', function() {
            let s = new Sudoku(FIELD);
            expect(s.getEmptyCells()).to.deep.equal([
                [0, 0], [0, 2], [0, 4], [0, 6], [0, 8],
                [1, 2], [1, 3], [1, 5], [1, 6],
                [2, 0], [2, 1], [2, 4], [2, 5], [2, 7], [2, 8],
                [3, 2], [3, 3], [3, 5], [3, 6], [3, 7],
                [4, 0], [4, 2], [4, 4], [4, 8],
                [5, 1], [5, 2], [5, 5], [5, 6], [5, 7],
                [6, 0], [6, 1], [6, 4], [6, 7], [6, 8],
                [7, 2], [7, 3], [7, 5], [7, 6],
                [8, 0], [8, 2], [8, 4], [8, 6], [8, 8]
            ]);
        });
    });


    describe('#getSquareValuesFromPoint', function() {
        it('should return right squares values', function() {
            let s = new Sudoku(FIELD);
            expect(s.getSquareValuesFromPoint(0, 0)).to.deep.equal([0, 7, 0, 6, 8, 0, 0, 0, 1]);
            expect(s.getSquareValuesFromPoint(1, 1)).to.deep.equal([0, 7, 0, 6, 8, 0, 0, 0, 1]);
            expect(s.getSquareValuesFromPoint(0, 6)).to.deep.equal([0, 6, 0, 0, 7, 9, 8, 0, 0]);
            expect(s.getSquareValuesFromPoint(2, 4)).to.deep.equal([3, 0, 8, 0, 4, 0, 5, 0, 0]);
            expect(s.getSquareValuesFromPoint(4, 4)).to.deep.equal([0, 3, 0, 6, 0, 1, 8, 7, 0]);
            expect(s.getSquareValuesFromPoint(8, 8)).to.deep.equal([4, 0, 0, 0, 9, 1, 0, 5, 0]);
        });
    });


    describe('#calcProbableValues', function() {
        it('should return probable values', function() {
            let s = new Sudoku(FIELD);
            expect(s.calcProbableValues(0, 0)).to.deep.equal([2, 4, 9]);
            expect(s.calcProbableValues(0, 6)).to.deep.equal([1, 2, 5]);
            expect(s.calcProbableValues(4, 4)).to.deep.equal([2, 5, 9]);
            expect(s.calcProbableValues(8, 8)).to.deep.equal([3, 6, 7]);
            expect(s.calcProbableValues(3, 3)).to.deep.equal([4]);
        });
    });


    describe('#solve', function(){
        it.only('should solve easiest sudoku', function() {
            let s = new Sudoku(FIELD);
            expect(s.solve().solved).to.equal(true);
            expect(s.getEmptyCells()).to.deep.equal([]);
        });


        it('should solve easy sudoku', function() {
            let s = new Sudoku([
                [0, 3, 5, 2, 9, 0, 8, 6, 4],
                [0, 8, 2, 4, 1, 0, 7, 0, 3],
                [7, 6, 4, 3, 8, 0, 0, 9, 0],
                [2, 1, 8, 7, 3, 9, 0, 4, 0],
                [0, 0, 0, 8, 0, 4, 2, 3, 0],
                [0, 4, 3, 0, 5, 2, 9, 7, 0],
                [4, 0, 6, 5, 7, 1, 0, 0, 9],
                [3, 5, 9, 0, 2, 8, 4, 1, 7],
                [8, 0, 0, 9, 0, 0, 5, 2, 6]
            ]);
            expect(s.solve().solved).to.equal(true);
            expect(s.getEmptyCells()).to.deep.equal([]);
        });


        it('should solve normal sudoku', function() {
            let s = new Sudoku([
                [0, 6, 5, 0, 0, 0, 4, 9, 0],
                [9, 0, 0, 0, 0, 0, 0, 0, 7],
                [7, 0, 0, 9, 3, 6, 0, 0, 2],
                [0, 0, 9, 3, 0, 5, 6, 0, 0],
                [0, 0, 6, 0, 8, 0, 9, 0, 0],
                [0, 0, 8, 6, 0, 2, 7, 0, 0],
                [8, 0, 0, 4, 2, 1, 0, 0, 6],
                [6, 0, 0, 0, 0, 0, 0, 0, 8],
                [0, 4, 2, 0, 0, 0, 1, 7, 0]
            ]);
            expect(s.solve().solved).to.equal(true);
            expect(s.getEmptyCells()).to.deep.equal([]);
        });


        it('should solve hard sudoku', function() {
            let s = new Sudoku([
                [0, 0, 9, 4, 0, 0, 8, 5, 0],
                [5, 0, 0, 7, 0, 0, 4, 0, 0],
                [2, 8, 0, 1, 0, 0, 0, 0, 0],
                [0, 9, 5, 0, 0, 1, 0, 0, 0],
                [0, 1, 0, 0, 6, 0, 0, 4, 0],
                [0, 0, 0, 9, 0, 0, 5, 7, 0],
                [0, 0, 0, 0, 0, 9, 0, 6, 4],
                [0, 0, 7, 0, 0, 5, 0, 0, 9],
                [0, 4, 8, 0, 0, 7, 3, 0, 0]
            ]);
            expect(s.solve().solved).to.equal(true);
            expect(s.getEmptyCells()).to.deep.equal([]);
        });


        it('should solve hardest sudoku', function() {
            let s = new Sudoku([
                [4, 0, 9, 0, 0, 6, 0, 0, 0],
                [0, 5, 0, 9, 0, 0, 7, 1, 0],
                [0, 0, 0, 0, 3, 0, 6, 0, 0],
                [5, 0, 0, 0, 0, 2, 0, 0, 0],
                [8, 4, 0, 0, 0, 0, 0, 2, 7],
                [0, 0, 0, 1, 0, 0, 0, 0, 8],
                [0, 0, 5, 0, 6, 0, 0, 0, 0],
                [0, 1, 7, 0, 0, 4, 0, 5, 0],
                [0, 0, 0, 2, 0, 0, 3, 0, 9]
            ]);
            expect(s.solve().solved).to.equal(true);
            expect(s.getEmptyCells()).to.deep.equal([]);
        });

    });
});
