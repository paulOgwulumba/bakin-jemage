import { createSlice } from '@reduxjs/toolkit';
import { player } from '../../utils/constants'; 

export const gamePlayStateSlice = createSlice({
    name: 'gamePlayState',
    initialState: {
        playerTurn: player.FIRST_PLAYER,
        currentPlayer: player.FIRST_PLAYER,
        isPlayerToPlayAgain: false,
        isPlayerToAttackOpponentPieces: false,
        numberOfAttacksLeft: 0,
        numberOfMoves: 0,
        currentRound: 1,
    },
    reducers: {
        updatePlayerTurn: (state, action) => {
            state.playerTurn = action.payload;
        },
        updateCurrentPlayer: (state, action) => {
            state.currentPlayer = action.payload;
        },
        updateIsPlayerToPlayAgain: (state, action) => {
            state.isPlayerToPlayAgain = action.payload;
        },
        updateIsPlayerToAttackOpponentPieces: (state, action) => {
            state.isPlayerToAttackOpponentPieces = action.payload;
        },
        updateNumberOfAttacksLeft: (state, action) => {
            state.numberOfAttacksLeft = action.payload;
        },
        updateNumberOfMoves: (state) => {
            state.numberOfMoves += 1;
        },
        updateCurrentRound: (state) => {
            state.currentRound += 1;
        },
        refreshGamePlayState: (state) => {
            state.playerTurn = player.FIRST_PLAYER;
            state.currentPlayer = player.FIRST_PLAYER;
            state.isPlayerToPlayAgain = false;
            state.isPlayerToAttackOpponentPieces = false;
            state.numberOfAttacksLeft = 0;
            state.numberOfMoves = 0;
            state.currentRound = 1;
        }
    }
});

export const {  
    updatePlayerTurn,
    updateCurrentPlayer,
    updateIsPlayerToPlayAgain,
    updateIsPlayerToAttackOpponentPieces,
    updateNumberOfAttacksLeft,
    refreshGamePlayState,
    updateCurrentRound,
    updateNumberOfMoves,
} = gamePlayStateSlice.actions;

export default gamePlayStateSlice.reducer;