// Various utility functions

export const boardsize = 12


export function getIndex(row, col) {
    return row * boardsize + col;
}

export function getCord(idx) {
    return [Math.floor(idx / boardsize), idx % boardsize];
}

export function getnthRowIdx(n) {
    return [...Array(boardsize).keys()].map(x => boardsize * n + x);
}

export function getnthColIdx(n) {
    return [...Array(boardsize).keys()].map(x => boardsize * x + n);
}

export function isValidIdx(idx) {
    if (0 <= idx && idx < Math.pow(boardsize, 2)){
        return true;
    } else {
        return false;
    }
}

export function isValidCord(cord) {
    if (0 <= cord[0] && cord[0] < boardsize &&
        0 <= cord[1] && cord[1] < boardsize) {
        return true;
    } else {
        return false;
    }
}

export function cordSum(cord1, cord2) {
    return [cord1[0] + cord2[0], cord1[1] + cord2[1]]
}

export function getNeighbors(idx) {
    let cord = getCord(idx)
    let relativeNeighbors = [
        [1, 2], [1, -2], [-1, 2], [-1, -2], 
        [2, 1], [2, -1], [-2, 1], [-2, -1],
    ]
    return relativeNeighbors.map(x => cordSum(cord, x)).filter(isValidCord).map(x => getIndex(x[0], x[1]))
}