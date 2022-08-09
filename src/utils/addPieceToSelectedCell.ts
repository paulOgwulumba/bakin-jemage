import { cellPosition } from './interfaces';
import { cellState } from './constants';
import { stringifyBoardState } from './unpackBoardState';
import { updateBoardState } from '../redux/slices';

/**
   * @description This adds a piece of player one or player two to a cell depending on whose turn to play it is.
   * @param unpackedBoardState The array representing the current board state.
   * @param position The position to add the piece to.
   * @param playerTurn The player whose turn it is to play.
   * @param setState Method that sets the react state representing the board arrangement.
   * @returns Array representing the new board state.
   */
 const addPieceToSelectedCell = (
    unpackedBoardState: Array<Array<number>>, 
    position: cellPosition, 
    dispatch?: any,
  ) => {
    unpackedBoardState[position.Y][position.X] = cellState.CELL_CONTAINING_BLOCK

    if (dispatch) {
        dispatch(updateBoardState(stringifyBoardState(unpackedBoardState)));
    }

    return unpackedBoardState;
}

export { addPieceToSelectedCell };