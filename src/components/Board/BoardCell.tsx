import React, { useState } from 'react';
import styles from './Board.module.css';
import { cellState as cellStateEnum } from '../../utils/constants';

interface BoardCellProps {
    cellPosition: {
        X: number,
        Y: number,
    }
    cellState: number,
    handleClick: Function,
}

const BoardCell = ({ 
    cellPosition,
    cellState = cellStateEnum.CELL_EMPTY,
    handleClick 
  }: BoardCellProps) => {

    return (
        <div className = { `${styles.boardCellWrapper}` }>
            <div 
                className = { `${styles.boardCell}`}
                onClick = { () => handleClick(cellPosition) }
            >
                <div className = {`${styles.boardPiece} ${getBoardPieceClassName(cellState)}`}></div>
            </div>
        </div>
    );
};

const getBoardPieceClassName = (state: cellStateEnum) => {
    if (state === cellStateEnum.CELL_CONTAINING_BLOCK) {
      return styles.boardPieceBlock;
    }

    if (state === cellStateEnum.CELL_CONTAINING_CAT) {
      return styles.boardPieceCat;
    }

    if (state === cellStateEnum.CELL_CONTAINING_TRAPPED_CAT) {
        return styles.boardPieceCatTrapped;
      }

    return styles.boardPieceHide;
}


export default BoardCell;