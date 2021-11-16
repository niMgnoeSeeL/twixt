/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './board.css';
import * as constant from './constant'

class Board extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    };

    constructor() {
        super()
        this.boardsize = constant.boardsize;
    }

    onClick = id => {
        if (this.isActive(id)) {
            this.props.moves.clickCell(id);
        }
    };

    isActive(id) {
        if (!this.props.isActive) return false;

        let [row, col] = constant.getCord(id);
        let edge = this.props.ctx.currentPlayer === "0" ? row : col;
        if (edge === 0 || edge === this.boardsize - 1) return false;

        if (this.props.G.cells[id] !== null) return false;
        return true;
    }

    render() {
        let tbody = [];
        for (let i = 0; i < constant.boardsize; i++) {
            let cells = [];
            for (let j = 0; j < constant.boardsize; j++) {
                const id = constant.getIndex(i, j);
                cells.push(
                    <td
                        key={id}
                        className={this.isActive(id) ? 'active' : ''}
                        onClick={() => this.onClick(id)}
                    >
                        {this.props.G.cells[id]}
                    </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        let winner = null;
        if (this.props.ctx.gameover) {
            winner =
                this.props.ctx.gameover.winner !== undefined ? (
                    <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
                ) : (
                        <div id="winner">Draw!</div>
                    );
        }

        return (
            <div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
                {winner}
            </div>
        );
    }
}

export default Board;