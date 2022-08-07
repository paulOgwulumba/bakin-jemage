import { createSlice } from '@reduxjs/toolkit';
import { cellState } from '../../utils/constants';

const generateInitialBoardstate = (numRows: number, numOfColumns: number) => {
    const startingRowCat = Math.round(Math.random() * (numRows - 1));
    const startingColumnCat = Math.round(Math.random() * (numOfColumns - 1));

    let boardState = '';

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numOfColumns; j++) {
            boardState += ((i === startingRowCat) && (j === startingColumnCat))? cellState.CELL_CONTAINING_CAT.toString() : cellState.CELL_EMPTY.toString();
        }
        boardState += '_';
    }

    return { 
        boardState, 
        catPosition: {
            X: startingColumnCat,
            Y: startingRowCat,
        } 
    }
}

const initialState = generateInitialBoardstate(10, 10);

export const boardStateSlice = createSlice({
    name: 'boardState',
    initialState: {
        boardState: initialState.boardState,
        allPiecesAddedToBoard: false,
        cellOfSelectedPiece: {
            X: 0, Y: 0,
        },
        boardStateArchive: [initialState.boardState],
        catPosition: initialState.catPosition,
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
        updateCatPosition: (state, action) => {
            state.catPosition = action.payload;
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
            const newState = generateInitialBoardstate(10, 10);
            state.boardState = newState.boardState;
            state.allPiecesAddedToBoard = false;
            state.cellOfSelectedPiece = {
                X: 0, Y: 0,
            }
            state.boardStateArchive = [newState.boardState];
            state.catPosition = newState.catPosition;
        }
    }
});

export const { updateBoardState, updateAllPiecesAddedToBoard, updateCellOfSelectedPiece, updateBoardStateArchive, refreshBoardState, updateCatPosition } = boardStateSlice.actions;

export default boardStateSlice.reducer;