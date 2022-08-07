import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './GamePlay.module.css';
import { Board } from '../../components';
import { 
    addPieceToSelectedCell,
    encodeGamePlayState,
    endAttack,
    endDoublePlay,
    unpackBoardState, 
    stringifyBoardState, 
    isCellEmpty,
    moveCatAround
} from '../../utils';
import { cellPosition, gamePlayState } from '../../utils/interfaces';
import { player, cellState } from '../../utils/constants';
import { Selector } from '../../redux/selectors';
import { 
    updateBoardState,
    updateCellOfSelectedPiece,
    updateNumberOfAttacksLeft,
    updateIsPlayerToAttackOpponentPieces,
    updateIsPlayerToPlayAgain,
    updateNumberOfMoves,
    refreshBoardState,
    refreshGamePlayState
 } from '../../redux/slices';
import { PiecesLeft } from './PiecesLeft';
import { Indicator } from './Indicator';
import { PiecesInHand } from './PiecesInHand';
import { PlayerTurnAnimator } from './PlayerTurnAnimator';

interface IGamePlayProps {
    resolvePromise: Function,
    isGameLoading: boolean,
}

function GamePlay({ resolvePromise, isGameLoading }: IGamePlayProps) {
    const dispatch = useDispatch();

    const boardState = useSelector(Selector.selectBoardState);
    const catPosition = useSelector(Selector.selectCatPosition);
    const numberOfMoves = useSelector(Selector.selectNumberOfMoves);
    
    // const handleClick = (position: cellPosition) => {
    //     let unpackedBoardState = unpackBoardState(boardState);
    //     const gamePlayState: gamePlayState = {
    //         playerTurn, 
    //         boardState: unpackedBoardState,
    //         currentPlayer,
    //         cellClicked: position,
    //         allPiecesAddedToBoard,
    //         cellOfSelectedPiece,
    //     };

    //     if (!allPiecesAddedToBoard) {
    //         const cellAdditionValidityStatus = isValidCellToAddPieceTo(gamePlayState);
    //         if (cellAdditionValidityStatus.isValid) {
    //             unpackedBoardState = addPieceToSelectedCell(unpackedBoardState, position, playerTurn, dispatch);
    //             checkIfAllPiecesHaveBeenAddedToBoard(playerTurn, playerTwoPiecesInHand, dispatch);
    //             reduceNumberOfPiecesHeldByPlayerThatJustPlayed(playerTurn, playerOnePiecesInHand, playerTwoPiecesInHand, dispatch);
    //             togglePlayerTurn(playerTurn, dispatch); 

    //             resolvePromise(stringifyBoardState(unpackedBoardState));
    //         } 
    //         else {
    //             alert(cellAdditionValidityStatus.message);
    //         }
    //     }
    //     else {
    //         // Make sure it is this player's turn to play
    //         if (currentPlayer !== playerTurn) {
    //             alert("It is not your turn to play, please hold on.");
    //             return;
    //         };

    //         // check if current player selected a piece before
    //         if (isPlayerToPlayAgain) {  
               
    //             if (isSelectedPieceClickedOnAgain(cellOfSelectedPiece, position)) {
    //                 deselectPreviouslySelectedCell(unpackedBoardState, playerTurn, position, dispatch); 
    //                 endDoublePlay(dispatch);
    //                 return;
    //             }

    //             const cellMovingValidityStatus = isValidCellToMovePieceTo(gamePlayState);

    //             if (cellMovingValidityStatus.isValid) {
    //                 unpackedBoardState = addPieceToSelectedCell(unpackedBoardState, position, playerTurn);
                    
    //                 unpackedBoardState = removePieceFromCell(unpackedBoardState, cellOfSelectedPiece);

    //                 const matchHandling = processMatch(gamePlayState);
    //                 if (matchHandling.isAMatch) {
                        
    //                     decorateMatchedPieces(matchHandling.cellPositionsWithAMatch, unpackedBoardState, playerTurn)
                    
    //                     // Signify that player can attack opponent's pieces.
    //                     dispatch(updateNumberOfAttacksLeft(matchHandling.cellPositionsWithAMatch.length> 3? 2 : 1));
    //                     dispatch(updateIsPlayerToAttackOpponentPieces(true));
    //                     dispatch(updateIsPlayerToPlayAgain(false));
    //                 } 
    //                 else {
    //                     togglePlayerTurn(playerTurn, dispatch);
    //                     endDoublePlay(dispatch);
    //                 }  

    //                 dispatch(updateBoardState(stringifyBoardState(unpackedBoardState)));

    //                 resolvePromise(stringifyBoardState(unpackedBoardState));
    //             } 
    //             else {
    //                 alert(cellMovingValidityStatus.message);
    //             }
    //         }
    //         else if (isPlayerToAttackOpponentPieces) {
                    
    //                 const pieceAttackValidityStatus = isValidPieceToAttack(gamePlayState);
    //                 if (pieceAttackValidityStatus.isValid) {
    //                     unpackedBoardState = removePieceFromCell(unpackedBoardState, position);
                        
    //                     //setNumberOfAttacksLeft(numberOfAttacksLeft - 1);
    //                     dispatch(updateNumberOfAttacksLeft(numberOfAttacksLeft - 1))

    //                     let boardStateString = stringifyBoardState(unpackedBoardState);

    //                     reduceNumberOfPiecesOfOpponentByOne(currentPlayer, playerOnePiecesLeft, playerTwoPiecesLeft, dispatch);

    //                     if (numberOfAttacksLeft < 2) {
    //                         togglePlayerTurn(playerTurn, dispatch);
                            
    //                         endAttack(dispatch);
                        
    //                         boardStateString = refreshMatchedCells(boardStateString, currentPlayer);
    //                     } 

    //                     dispatch(updateBoardState(boardStateString));

    //                     resolvePromise(boardStateString);
    //                 }
    //                 else {
    //                     alert(pieceAttackValidityStatus.message);
    //                 }
    //         }
    //         else {
    //             const pieceSelectionValidationStatus = isValidPieceToSelect(gamePlayState);
    //             if (pieceSelectionValidationStatus.isValid) {
    //                 unpackedBoardState =  selectPieceToBeMoved(unpackedBoardState, playerTurn, position);
                    
    //                 dispatch(updateBoardState(stringifyBoardState(unpackedBoardState)));

    //                 dispatch(updateIsPlayerToPlayAgain(true));

    //                 dispatch(updateCellOfSelectedPiece(position));
    //             }
    //             else {
    //                 alert(pieceSelectionValidationStatus.message);
    //             }
    //         }
    //     }
    // }

    const handleClick = (position: cellPosition) => {
        let unpackedBoardState = unpackBoardState(boardState);

        const stateOfSelectedCell = unpackedBoardState[position.Y][position.X];

        if (isCellEmpty(stateOfSelectedCell)) {
            addPieceToSelectedCell(unpackedBoardState, position, dispatch);
            dispatch(updateNumberOfMoves());

            const continueGame = moveCatAround(unpackedBoardState, catPosition, dispatch);
        }
        else {
            alert('You cannot place a block in this position because it is already occupied.')
        }
    }

    return (
      <>
        <div className={styles.App}>
            <div className={styles["player-info-overview"]}>
                <div className = {styles["player-info-title-wrapper"]}>
                  <p className = {styles["player-info-title"]}>
                      You
                  </p>
                  
                  <PlayerTurnAnimator isActive = { !isGameLoading } title='Your turn'/>
                  
                </div>
                <div className={styles["player-info"]}>
                    <p className={styles["player-info-heading"]}>Number of moves</p>
                    <Indicator
                        numberOfMoves={numberOfMoves}
                    />
                </div>
            </div>
            <Board 
                boardState = { boardState } 
                numberOfColumns = {10} 
                numberOfRows = {10}
                handleCellClick = { handleClick }
            />
        </div>
      </>
    );
};


export { GamePlay };