export class GridIterator {
    col: number = 0;
    row: number = 0;
    cols: number;
    rows: number;

    constructor(rows: number, cols: number) {
        this.cols = cols;
        this.rows = rows;
        this.reset();
    }
    
    reset() {
        this.col = 0;
        this.row = 0;
    }

    advance() {
        this.col = ++this.col % this.cols;
        if (this.col === 0) ++this.row;
    }

    toString() {
        return `r${this.row}c${this.col}`
    }

    isFirstCell() {
        return this.col === 0 && this.row === 0;
    }

    hasMore() {
        return this.row < this.rows;
    }
}