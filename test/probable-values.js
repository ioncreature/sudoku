'use strict';

const
    expect = require('chai').expect,
    ProbableValues = require('../lib/probable-values');


describe('ProbableValues', function() {
    let prob;

    beforeEach(() => prob = getProbables());

    describe('#getRow', function() {
        it('should return row', function() {
            expect(prob.getRow(0)).to.deep.equal([
                [2, 4, 9], [], [2, 4, 5], [], [1, 2, 9], [], [1, 2, 5], [], [4, 5]
            ]);

            expect(prob.getRow(2)).to.deep.equal([
                [2, 3, 4, 9], [3, 9], [], [], [2, 6, 9], [2, 7, 9], [], [2, 4], [3, 4]
            ]);

            expect(prob.getRow(5)).to.deep.equal([
                [], [3, 9], [3, 6], [], [], [5, 9], [5, 6, 9], [4], []
            ]);

            expect(prob.getRow(7)).to.deep.equal([
                [], [], [3, 4, 7], [7], [], [3, 7], [2, 3], [], []
            ]);
        });
    });


    describe('#getColumn', function() {
        it('should return column', function() {
            expect(prob.getColumn(0)).to.deep.equal([
                [2, 4, 9], [], [2, 3, 4, 9], [], [2, 8, 9], [], [3, 8], [], [3, 8]
            ]);

            expect(prob.getColumn(4)).to.deep.equal([
                [1, 2, 9], [], [2, 6, 9], [], [2, 5, 9], [], [1, 5], [], [1]
            ]);

            expect(prob.getColumn(8)).to.deep.equal([
                [4, 5], [], [3, 4], [], [5], [], [3, 7], [], [3, 6, 7]
            ]);
        });
    });


    describe('#getSquare', function() {
        it('should return flattened square', function() {
            expect(prob.getSquare(1, 1)).to.deep.equal([
                [2, 4, 9], [], [2, 4, 5], [], [], [2, 3, 5], [2, 3, 4, 9], [3, 9], []
            ]);

            expect(prob.getSquare(7, 7)).to.deep.equal([
                [], [8], [3, 7], [2, 3], [], [], [3, 6], [], [3, 6, 7]
            ]);
        });
    });


    describe('#getSquareExceptPoint', function() {
        it('should return flattened square without point', function() {
            expect(prob.getSquareExceptPoint(1, 1)).to.deep.equal([
                [2, 4, 9], [], [2, 4, 5], [], [2, 3, 5], [2, 3, 4, 9], [3, 9], []
            ]);

            expect(prob.getSquareExceptPoint(7, 7)).to.deep.equal([
                [], [8], [3, 7], [2, 3], [], [3, 6], [], [3, 6, 7]
            ]);
        });
    });


    describe('#removeFromCell', function() {
        it('should remove from cell', function() {
            prob.removeFromCell(0, 0, 2);
            expect(prob.get(0, 0)).to.deep.equal([4, 9]);

            prob.removeFromCell(0, 0, 4);
            expect(prob.get(0, 0)).to.deep.equal([9]);

            prob.removeFromCell(0, 0, 9);
            expect(prob.get(0, 0)).to.deep.equal([]);

            prob.removeFromCell(0, 0, 5);
            expect(prob.get(0, 0)).to.deep.equal([]);

            prob.removeFromCell(0, 1, 1);
            expect(prob.get(0, 1)).to.deep.equal([]);
        });
    });


    describe('#removeFromRow', function() {
        it('should remove from row', function() {
            prob.removeFromRow(0, 2);
            expect(prob.getRow(0)).to.deep.equal([
                [4, 9], [], [4, 5], [], [1, 9], [], [1, 5], [], [4, 5]
            ]);

            prob.removeFromRow(0, 4);
            expect(prob.getRow(0)).to.deep.equal([
                [9], [], [5], [], [1, 9], [], [1, 5], [], [5]
            ]);

            prob.removeFromRow(0, 9);
            expect(prob.getRow(0)).to.deep.equal([
                [], [], [5], [], [1], [], [1, 5], [], [5]
            ]);

            prob.removeFromRow(0, 5);
            expect(prob.getRow(0)).to.deep.equal([
                [], [], [], [], [1], [], [1], [], []
            ]);

            prob.removeFromRow(0, 1);
            expect(prob.getRow(0)).to.deep.equal([
                [], [], [], [], [], [], [], [], []
            ]);
        });
    });


    describe('#removeFromColumn', function() {
        it('should remove from column', function() {
            prob.removeFromColumn(0, 2);
            expect(prob.getColumn(0)).to.deep.equal([
                [4, 9], [], [3, 4, 9], [], [8, 9], [], [3, 8], [], [3, 8]
            ]);

            prob.removeFromColumn(0, 4);
            expect(prob.getColumn(0)).to.deep.equal([
                [9], [], [3, 9], [], [8, 9], [], [3, 8], [], [3, 8]
            ]);

            prob.removeFromColumn(0, 9);
            expect(prob.getColumn(0)).to.deep.equal([
                [], [], [3], [], [8], [], [3, 8], [], [3, 8]
            ]);

            prob.removeFromColumn(0, 3);
            expect(prob.getColumn(0)).to.deep.equal([
                [], [], [], [], [8], [], [8], [], [8]
            ]);
        });
    });


    describe('#removeFromSquare', function() {
        it('should remove from column', function() {
            prob.removeFromSquare(0, 0, 2);
            expect(prob.getSquare(1, 1)).to.deep.equal([
                [4, 9], [], [4, 5], [], [], [3, 5], [3, 4, 9], [3, 9], []
            ]);

            prob.removeFromSquare(0, 0, 4);
            expect(prob.getSquare(1, 1)).to.deep.equal([
                [9], [], [5], [], [], [3, 5], [3, 9], [3, 9], []
            ]);

            prob.removeFromSquare(0, 0, 9);
            expect(prob.getSquare(1, 1)).to.deep.equal([
                [], [], [5], [], [], [3, 5], [3], [3], []
            ]);

            prob.removeFromSquare(0, 0, 5);
            expect(prob.getSquare(1, 1)).to.deep.equal([
                [], [], [], [], [], [3], [3], [3], []
            ]);

            prob.removeFromSquare(0, 0, 3);
            expect(prob.getSquare(1, 1)).to.deep.equal([
                [], [], [], [], [], [], [], [], []
            ]);
        });
    });


    describe('#removeFromAdjacentCells', function() {
        it('should remove from adjacent cells', function() {
            prob.removeFromAdjacentCells(0, 0, 2);
            expect(prob.getRow(0)).to.deep.equal([
                [4, 9], [], [4, 5], [], [1, 9], [], [1, 5], [], [4, 5]
            ]);
            expect(prob.getColumn(0)).to.deep.equal([
                [4, 9], [], [3, 4, 9], [], [8, 9], [], [3, 8], [], [3, 8]
            ]);
            expect(prob.getSquare(1, 1)).to.deep.equal([
                [4, 9], [], [4, 5], [], [], [3, 5], [3, 4, 9], [3, 9], []
            ]);
        });
    });
});


function getProbables() {
    return new ProbableValues([
        [[2, 4, 9], [], [2, 4, 5], [], [1, 2, 9], [], [1, 2, 5], [], [4, 5]],
        [[], [], [2, 3, 5], [1], [], [2], [1, 2, 3, 5], [], []],
        [[2, 3, 4, 9], [3, 9], [], [], [2, 6, 9], [2, 7, 9], [], [2, 4], [3, 4]],
        [[], [], [2, 6], [4], [], [2, 9], [1, 6, 9], [1, 4], []],
        [[2, 8, 9], [], [2, 8], [], [2, 5, 9], [], [], [], [5]],
        [[], [3, 9], [3, 6], [], [], [5, 9], [5, 6, 9], [4], []],
        [[3, 8], [1, 3], [], [], [1, 5], [], [], [8], [3, 7]],
        [[], [], [3, 4, 7], [7], [], [3, 7], [2, 3], [], []],
        [[3, 8], [], [3, 7, 8], [], [1], [], [3, 6], [], [3, 6, 7]]
    ]);
}