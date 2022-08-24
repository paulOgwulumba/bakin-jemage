import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './GamePlay.module.css';
import { Board } from '../../components';
import { 
    addPieceToSelectedCell,
    unpackBoardState, 
    isCellEmpty,
    moveCatAround
} from '../../utils';
import { cellPosition } from '../../utils/interfaces';
import { Selector } from '../../redux/selectors';
import { updateNumberOfMoves, updatePlayerIsDone, updateBoardStateArchive } from '../../redux/slices';
import { Indicator } from './Indicator';
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
    const numberOfOpponentMoves = useSelector(Selector.selectNumberOfOpponentMoves);
    const waitingForPlayer = useSelector(Selector.selectWaitingForPlayer);

    const handleClick = (position: cellPosition) => {
        let unpackedBoardState = unpackBoardState(boardState);

        const stateOfSelectedCell = unpackedBoardState[position.Y][position.X];

        if (isCellEmpty(stateOfSelectedCell)) {
            addPieceToSelectedCell(unpackedBoardState, position, dispatch);
            dispatch(updateNumberOfMoves());

            const result = moveCatAround(unpackedBoardState, catPosition, dispatch);

            dispatch(updateBoardStateArchive(result.boardState));

            if (!result.continueGame) {
                if (waitingForPlayer) {
                    resolvePromise(numberOfMoves + 1)
                }
                else {
                    dispatch(updatePlayerIsDone(true));
                }
            }
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

                <div className = {styles["player-info-title-wrapper"]} style={{marginTop: "100px"}}>
                  <p className = {styles["player-info-title"]}>
                      Opponent
                  </p>
                  
                  <PlayerTurnAnimator isActive = { isGameLoading } title="Opponent's turn"/>
                  
                </div>

                <div className={styles["player-info"]}>
                    <p className={styles["player-info-heading"]}>Number of moves</p>
                    <Indicator
                        numberOfMoves={numberOfOpponentMoves}
                    />
                </div>
            </div>
            <div className={styles["game-info"]}>
                <Board 
                    boardState = { boardState } 
                    numberOfColumns = {10} 
                    numberOfRows = {10}
                    handleCellClick = { handleClick }
                />
            </div>
        </div>
      </>
    );
};


export { GamePlay };