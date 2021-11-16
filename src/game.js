/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from 'boardgame.io/core';
import * as constant from './constant'

function IsVictory(cells, currentPlayer) {

    var getNthLineIdx = null;
    if (currentPlayer === "0") {
        getNthLineIdx = constant.getnthColIdx;
    } else {
        getNthLineIdx = constant.getnthRowIdx;
    }

    if (getNthLineIdx(0).map(x => cells[x]).filter(x => !!x).length === 0 &&
        getNthLineIdx(constant.boardsize - 1).map(x => cells[x]).filter(x => !!x).length === 0) {
            return false;
    }

    return true;

}

const TwixT = Game({
    name: 'TwixT',

    setup: () => ({
        cells: Array(Math.pow(constant.boardsize, 2)).fill(null),
    }),

    moves: {
        clickCell(G, ctx, id) {
            const cells = [...G.cells];

            if (cells[id] === null) {
                cells[id] = ctx.currentPlayer;
            }
            
            return { ...G, cells };
        },
    },

    flow: {
        movesPerTurn: 1,

        endGameIf: (G, ctx) => {
            if (IsVictory(G.cells, ctx.currentPlayer)) {
                return { winner: ctx.currentPlayer };
            }
            if (G.cells.filter(c => c === null).length == 0) {
                return { draw: true };
            }
        },
    },
});

export default TwixT;