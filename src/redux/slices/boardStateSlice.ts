import { createSlice } from '@reduxjs/toolkit';
import { cellState } from '../../utils/constants';

const generateInitialBoardstate = (numRows: number, numOfColumns: number) => {
    const startingRowCat = Math.round(Math.random() * (numRows - 1));
    const startingColumnCat = Math.round(Math.random() * (numOfColumns - 1));

    let boardState = '';

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numOfColumns; j++) {
            boardState += ((i === startingRowCat) && (j === startingColumnCat))? cellState.CELL_CONTAINING_CAT.toString() : cellState.CELL_EMPTY.toString();
            //boardState += Math.round(Math.random() * 3).toString();
        }
        boardState += '_';
    }

    return boardState;
}

export const boardStateSlice = createSlice({
    name: 'boardState',
    initialState: {
        boardState: generateInitialBoardstate(10, 10),
        allPiecesAddedToBoard: false,
        cellOfSelectedPiece: {
            X: 0, Y: 0,
        },
        boardStateArchive: [generateInitialBoardstate(10, 10)],
    },
    reducers: {
        updateBoardState: (state, action) => {
            state.boardState = action.payload;
        },
        updateAllPiecesAddedToBoard: (state, action = { payload: true, type: '' }) => {
            state.allPiecesAddedToBoard = action.payload;
        },
        updateCellOfSelectedPiece: (state, action) => {
            state.cellOfSelectedPiece = action.payload;
        },
        updateBoardStateArchive: (state, action) => {
            let tempArchive = [];

            for (let archive of state.boardStateArchive) {
                tempArchive.push(archive);
            }

            tempArchive.push(action.payload);

            state.boardStateArchive = tempArchive;
        },
        refreshBoardState: (state) => {
            state.boardState = generateInitialBoardstate(10, 10);
            state.allPiecesAddedToBoard = false;
            state.cellOfSelectedPiece = {
                X: 0, Y: 0,
            }
            state.boardStateArchive = [generateInitialBoardstate(10, 10)];

        }
    }
});

export const { updateBoardState, updateAllPiecesAddedToBoard, updateCellOfSelectedPiece, updateBoardStateArchive, refreshBoardState } = boardStateSlice.actions;

export default boardStateSlice.reducer;