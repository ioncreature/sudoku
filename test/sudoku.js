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
            expect(s.squareHas(4, 1, 8)).to.equal(true);
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
});
