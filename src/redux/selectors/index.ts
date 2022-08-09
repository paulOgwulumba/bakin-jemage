import Store from '../store';

const selectBoardState = (state: any) => {
    return state.boardState.boardState;
};

const selectCurrentPlayer = (state: any) => {
    return state.gamePlayState.currentPlayer;
};

const selectPlayerWalletAccount = (state: any) => {
  return state.appState.playerWalletAccount;
};

const selectCurrentView = (state: any) => {
  return state.appState.currentView;
};

const selectContractAddress = (state: any) => {
    return state.appState.contractAddress;
};

const selectBoardStateArchive = (state: any) => {
    return state.boardState.boardStateArchive;
};

const selectNumberOfMoves = (state: any) => {
    return state.gamePlayState.numberOfMoves;
};

const selectNumberOfOpponentMoves = (state: any) => {
    return state.gamePlayState.numberOfOpponentMoves;
}

const selectCurrentRound = (state: any) => {
    return state.gamePlayState.currentRound;
};

const selectCatPosition = (state: any) => {
    return state.boardState.catPosition;
};

const selectPlayerIsDone = (state: any) => {
    return state.gamePlayState.playerIsDone;
};

const selectWaitingForPlayer = (state: any) => {
    return state.gamePlayState.waitingForPlayer;
}

export const Selector = {
    selectBoardState,
    selectBoardStateArchive,
    selectContractAddress,
    selectCurrentPlayer,
    selectPlayerWalletAccount,
    selectCurrentView,
    selectNumberOfMoves,
    selectCurrentRound,
    selectCatPosition,
    selectPlayerIsDone,
    selectNumberOfOpponentMoves,
    selectWaitingForPlayer,
}