import { createSlice } from '@reduxjs/toolkit';
import { player } from '../../utils/constants'; 

export const gamePlayStateSlice = createSlice({
    name: 'gamePlayState',
    initialState: {
        currentPlayer: player.FIRST_PLAYER,
        numberOfMoves: 0,
        numberOfOpponentMoves: 0,
        currentRound: 1,
        playerIsDone: false,
        waitingForPlayer: false,
    },
    reducers: {
        updateNumberOfMoves: (state) => {
            state.numberOfMoves += 1;
        },
        updateNumberOfOpponentMoves: (state, action) => {
            state.numberOfOpponentMoves = action.payload;
        },
        updateCurrentRound: (state) => {
            state.currentRound += 1;
        },
        updateCurrentPlayer: (state, action) => {
            state.currentPlayer = action.payload;
        },
        updatePlayerIsDone: (state, action) => {
            state.playerIsDone = action.payload;
        },
        updateWaitingForPlayer: (state, action) => {
            state.waitingForPlayer = action.payload;
        },
        refreshGamePlayState: (state) => {
            state.currentPlayer = player.FIRST_PLAYER;
            state.numberOfMoves = 0;
            state.currentRound = 1;
            state.playerIsDone = false;
            state.waitingForPlayer = false;
            state.numberOfOpponentMoves = 0;
        },
        moveToNextRound: (state) => {
            state.numberOfMoves = 0;
            state.currentRound += 1;
            state.playerIsDone = false;
            state.waitingForPlayer = false;
            state.numberOfOpponentMoves = 0;
        }
    }
});

export const {  
    refreshGamePlayState,
    updateCurrentRound,
    updateNumberOfMoves,
    updateCurrentPlayer,
    updatePlayerIsDone,
    updateWaitingForPlayer,
    updateNumberOfOpponentMoves,
    moveToNextRound,
} = gamePlayStateSlice.actions;

export default gamePlayStateSlice.reducer;