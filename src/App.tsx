import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { ConditionalRender } from './components';
import { 
    AttacherView,
    ConnectAccountView, 
    ConnectAccountErrorView,
    DeployerOrAttacherView,
    DeployerSetWagerView,
    GamePlayView, 
    WaitingForAttacherView,
    ConnectAccountWithMnemonicView,
    WinnerView,
    LoserView,
    ReviewGameView,
} from './views';
import { Views, participantTitle, player } from './utils/constants';
import { Loader, GameLoader } from './components';
import { Selector } from './redux/selectors';
import Store from './redux/store';
import { 
    updateBoardStateArchive,
    updateContractAddress,
    updatePlayerWalletAccount, 
    updateCurrentPlayer,
    updateCurrentView, 
    updateWaitingForPlayer,
    updateNumberOfOpponentMoves,
    moveToNextRound,
    refreshBoardState,
    updatePlayerIsDone,
} from './redux/slices';

export interface IAppProps {
    reach: any,
    reachBackend: any,
};

const App = ({ reach, reachBackend }: IAppProps) => {
    const playerWalletAccount = useSelector(Selector.selectPlayerWalletAccount);
    const currentView = useSelector(Selector.selectCurrentView);
    const playerIsDone = useSelector(Selector.selectPlayerIsDone);
    const numberOfMoves = useSelector(Selector.selectNumberOfMoves);

    const [promise, setPromise] = useState({resolve: null});
    const [isLoading, setIsLoading] = useState(false);
    const [isGameLoading, setIsGameLoading] = useState(false);;
    const [mnemonic, setMnemonic] = useState('');
    const [contractAddressEntry, setContractAddressEntry] = useState('');
    const [displayContractAddressError, setDisplayContractAddressError] = useState(false);
    const [displayMnemonicError, setDisplayMnemonicError] = useState(false);

    const dispatch = useDispatch();

    const handleMnemonicChange = (value: string) => {
        setMnemonic(value);
        setDisplayMnemonicError(false);
    };

    const handleContractAddressChange = (value: string) => {
        setContractAddressEntry(value);
        setDisplayContractAddressError(false);
    }

    const awaitPlayerMove = async () => {
        if (Store.getState().gamePlayState.playerIsDone === true) {
            dispatch(updateWaitingForPlayer(false));
            return Store.getState().gamePlayState.numberOfMoves
        }
        else {
            dispatch(updateWaitingForPlayer(true));
            return await new Promise((resolve) => {
                setPromise({resolve: resolve});
            })
        }
    };

    const InteractInterface = {
        getNumberOfMoves: async () => {
            setIsGameLoading(false);
            return await awaitPlayerMove();
        },

        getOpponentResult: (numOfMoves: any) => {
            setIsGameLoading(true);
            dispatch(updateNumberOfOpponentMoves(parseInt(numOfMoves)));
        }, 

        informTimeout: () => {
            alert("Time is up!!!");
        },

        informDraw: () => {
            alert("A draw was recorded, play again to determine winner!");
            dispatch(moveToNextRound());
            dispatch(refreshBoardState());
            setIsGameLoading(false);
        }, 

        declareWinner: (result: any) => {
            const currentPlayer = Store.getState().gamePlayState.currentPlayer;
            setIsGameLoading(false);
            setIsLoading(false);
            dispatch(updatePlayerIsDone(false));
            
            if (parseInt(result) === 0) {
                dispatch(updateCurrentView(currentPlayer === player.FIRST_PLAYER? Views.WINNER_VIEW : Views.LOSER_VIEW));
            }
            else {
                dispatch(updateCurrentView(currentPlayer === player.SECOND_PLAYER? Views.WINNER_VIEW : Views.LOSER_VIEW));
            }
        }
    };

    const acceptWager = (wager: number) => {
        setIsGameLoading(true);
        alert(`Do you accept a wager of ${reach.formatCurrency(wager)}?`);
    }

    const convertCurrencyFromBigNumberToSmallNumber = (amount: number) => {
        return reach.formatCurrency(amount, 10);
    };

    const handleCreateNewGame = async (wager: number) => {
        const balanceBigNum = await reach.balanceOf(playerWalletAccount);
        const balance = convertCurrencyFromBigNumberToSmallNumber(balanceBigNum);

        if ((balance) < (wager + 1)) {
            alert(`Insufficient funds in wallet to set the wager of ${wager}.`);
            return;
        }

        const interact = {
            ...InteractInterface,
            wager: reach.parseCurrency(wager),
            deadline: 120,              // deadline of 120 seconds
            informOfJoiner: () => {
                dispatch(updateCurrentView(Views.GAME_PLAY_VIEW));
            }
        };

        let contract;

        setIsLoading(true);

        try {
            contract = playerWalletAccount.contract(reachBackend);
        } 
        catch (err) {
            setIsLoading(false);
            return;
        } 

        try {  
            reachBackend?.Alice(contract, interact);

            const contractAddress = JSON.stringify(await contract.getInfo(), null, 2);
            setIsLoading(false);

            dispatch(updateContractAddress(contractAddress));
            dispatch(updateCurrentView(Views.WAITING_FOR_ATTACHER_VIEW));
            dispatch(updateCurrentPlayer(player.FIRST_PLAYER))
        }
        catch (err) {
            setIsLoading(false);
            return;
        }
    };

    const handleJoinGame = async (contractAddress: string) => {
        setIsLoading(true);
        
        try {
            const contract = await playerWalletAccount?.contract(reachBackend, JSON.parse(contractAddress));
        
            const interact = {
                ...InteractInterface,
                acceptWager,
            };
            
            reachBackend.Bob(contract, interact);
            setIsGameLoading(true);
            setIsLoading(false);
            
            dispatch(updateCurrentPlayer(player.SECOND_PLAYER))
            dispatch(updateCurrentView(Views.GAME_PLAY_VIEW));
            dispatch(updateContractAddress(""));
        } catch (err) {
            setIsLoading(false);
            setDisplayContractAddressError(true);
            return;
        }
    };

    const resolvePromise = (numberOfMoves) => {
        setIsGameLoading(true);

        promise.resolve(numberOfMoves);
    }

    const handlePlayerRoleSelect = (role: participantTitle) => {
        if (role === participantTitle.DEPLOYER) {
            dispatch(updateCurrentView(Views.DEPLOYER_SET_WAGER_VIEW));
        }
        else {
            dispatch(updateCurrentView(Views.ATTACHER_VIEW));
        } 
    };

    const handleReturn = (viewToReturnTo: Views) => {
        dispatch(updateCurrentView(viewToReturnTo));
    };

    const connectToDefaultAccount = async () => {
        try {
            const walletAccount = await reach.getDefaultAccount();
            dispatch(updatePlayerWalletAccount(walletAccount));
            dispatch(updateCurrentView(Views.DEPLOYER_OR_ATTACHER_VIEW));
        }
        catch (err) {
            dispatch(updateCurrentView(Views.CONNECT_ACCOUNT_ERROR_VIEW));
        }
    };

    const connectAccountWithKeyPhrase = async (mnemonic: string) => {
        try {
            const walletAccount = await reach.newAccountFromMnemonic(mnemonic);
            dispatch(updatePlayerWalletAccount(walletAccount));
            dispatch(updateCurrentView(Views.DEPLOYER_OR_ATTACHER_VIEW));
        }
        catch (e) {
            setDisplayMnemonicError(true);
        }
    }

    useEffect(() => {
        connectToDefaultAccount();
    }, []);

    return (
      <div className = 'App'>
          <Loader isVisible = { isLoading || playerIsDone || isGameLoading }/>

          <GameLoader isVisible = { isGameLoading } />

          <ConditionalRender isVisible = { currentView === Views.CONNECT_ACCOUNT_VIEW }>
              <ConnectAccountView />
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.CONNECT_ACCOUNT_ERROR_VIEW }>
              <ConnectAccountErrorView handleReturn = { handleReturn }/>
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.DEPLOYER_OR_ATTACHER_VIEW }>
              <DeployerOrAttacherView handleParticipantTitleSelect = { handlePlayerRoleSelect }/>
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.DEPLOYER_SET_WAGER_VIEW }>
              <DeployerSetWagerView 
                  handleReturn = { handleReturn }
                  handleCreateNewGame = { handleCreateNewGame }
              />
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.GAME_PLAY_VIEW }>
              <GamePlayView 
                    resolvePromise = { resolvePromise }
                    isGameLoading = { isGameLoading }
              />
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.WAITING_FOR_ATTACHER_VIEW }>
                <WaitingForAttacherView />
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.ATTACHER_VIEW }>
                <AttacherView 
                    handleReturn = { handleReturn }
                    handleJoinGame = { handleJoinGame }
                    contractAddress = { contractAddressEntry }
                    handleChange = { handleContractAddressChange }
                    isError  = { displayContractAddressError }
                />
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.CONNECT_ACCOUNT_WITH_MNEMONIC_VIEW }>
                <ConnectAccountWithMnemonicView 
                    handleReturn = { handleReturn }
                    handleConnectAccountWithKeyPhrase = { connectAccountWithKeyPhrase }
                    handleChange = { handleMnemonicChange }
                    isError = { displayMnemonicError }
                    mnemonic = { mnemonic }
                />
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.WINNER_VIEW }>
              <WinnerView />
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.LOSER_VIEW }>
              <LoserView />
          </ConditionalRender>

          <ConditionalRender isVisible = { currentView === Views.REVIEW_GAME_VIEW }>
              <ReviewGameView />
          </ConditionalRender>
      </div>
    )
};

export default App;
