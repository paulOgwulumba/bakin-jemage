import { cellState } from "./constants";

/**
 * @description This method checks if the state of a cell signifies that it contains a piece of 
 * the first player.
 * @param stateOfCell State of the cell to be checked
 * @returns {Boolean} True if the cell contains a piece of the first player and false if it does not.
 */
 const cellContainsPiece = (stateOfCell: number) => {
    if (stateOfCell === cellState.CELL_CONTAINING_BLOCK) return true;
    if (stateOfCell === cellState.CELL_CONTAINING_CAT) return true;
    if (stateOfCell === cellState.CELL_CONTAINING_TRAPPED_CAT) return true;
  
    return false;
}

export { cellContainsPiece };