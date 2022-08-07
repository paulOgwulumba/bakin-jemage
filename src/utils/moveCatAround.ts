import { cellPosition } from "./interfaces";
import { getListOfEmptyCellsAroundCat } from "./getListOfEmptyCellsAroundCat";
import { stringifyBoardState } from './unpackBoardState';
import { isCellEmpty } from "./isCellEmpty";
import { updateBoardState } from '../redux/slices';
import { updateCatPosition } from "../redux/slices";
import { cellState } from "./constants";

export const moveCatAround = (
    unpackedBoardState: Array<Array<number>>, 
    catPosition: cellPosition, 
    dispatch: any
) => {
    const listOfEmptyCells = getListOfEmptyCellsAroundCat(unpackedBoardState, catPosition);
    
    if (listOfEmptyCells.length > 0) {
        const randomCell = listOfEmptyCells[Math.round(Math.random() * (listOfEmptyCells.length - 1))];

        unpackedBoardState[randomCell.Y][randomCell.X] = cellState.CELL_CONTAINING_CAT;

        unpackedBoardState[catPosition.Y][catPosition.X] = cellState.CELL_EMPTY;

        dispatch(updateBoardState(stringifyBoardState(unpackedBoardState)));
        dispatch(updateCatPosition(randomCell));

        return true;
    }
    else {
        unpackedBoardState[catPosition.Y][catPosition.X] = cellState.CELL_CONTAINING_TRAPPED_CAT;
        dispatch(updateBoardState(stringifyBoardState(unpackedBoardState)));
        return false;
    }
}