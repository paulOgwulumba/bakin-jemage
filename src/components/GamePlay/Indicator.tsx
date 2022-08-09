import React from 'react';
import styles from './GamePlay.module.css';
import { player } from '../../utils/constants';
import { Selector } from '../../redux/selectors';
import { useSelector } from 'react-redux';

export const Indicator = ({numberOfMoves}) => {

    return (
        <div className={styles['player-pieces-left-wrapper']}>
            <div className={styles['player-pieces-left-inner-wrapper']}>
              { numberOfMoves }
            </div>
        </div>
    )
}