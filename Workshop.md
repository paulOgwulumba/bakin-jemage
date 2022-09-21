# Workshop: Le Chat Noir

---

In this workshop, we'll go through our bounty hack submission for the Decentralized Umoja 3 Bounty Hack.

This workshop assumes that you've completed the tutorial.

I'll assume that you’ll go through this workshop in a directory named `~/reach/le-chat-noir`:

```bash
$ mkdir -p ~/reach/le-chat-noir
```

And that you have a copy of Reach installed in ~/reach so you can write

```bash
$ ../reach version
```

and it will run Reach.

You should start off by initializing your Reach program:

```bash
$ ../reach init
```

## Problem Analysis

The first step of designing any program is to perform problem analysis and determine what we have to do to successfully solve the problem.

You should answer some questions concerning the design of the application to go through the same process we did while writing this project.

You should also write your own answers in your Reach program (index.rsh) using a comment. /* Remember comments are written like this. */

    Who is involved in this application?
    
    What information do they know at the start of the program?
    
    What information are they going to discover and use in the program?
    
    What funds change ownership during the application and how?

**Stop!**
Write down the problem analysis of this program as a comment.

Here's my answers to those questions:

    Le Chat Noir involves 2 roles: One player (Alice) who creates the game and a second player (Bob) who joins the game.
	
	At the start of the program, Alice would know the wager and the timeout limit (deadline) they set for that particular session.

    When Bob joins, Alice is going to be notified that a player has joined the game.
	
	During the course of the game, each player is going to know how many moves it took their opponent to capture the cat.
	
	The two players will both pay the wager and the winner of the game would get paid both players' wagers as a reward.  

It is completely okay if your answers differ from mine. If you're confident that your answers are correct, you can continue with them through this workshop.

## Data Definition

For the next step, I am going to define the data type equivalents of the values I used in my answers from the previous section. Also, in this step I'll be deciding what functions our participants will have.

* What functions/values does Alice need to start the game?
* What functions/values does Bob need to join the game?
* What functions/values do the two players need to play and observe moves?
* What functions/values do the two players need to know the outcome of each round?

You should look back at your problem analysis to do this step. Whenever a participant starts off knowing something, then it is a field in the interact object. If they learn something, then it will be an argument to a function. If they provide something later, then it will be the result of a function.

You should write your answers in your Reach file (`index.rsh`) as the participant interact interface for each of the participants.

**Stop!**
Write down the data definitions for this program as definitions.

It's time to see my answers!

```javascript
const Player = {
    ...hasRandom,
    getNumberOfMoves: Fun([], UInt),
    informTimeout: Fun([], Null),
    informDraw: Fun([], Null),
    declareWinner: Fun([UInt], Null),
    getOpponentResult: Fun([UInt], Null),
};

[
	Participant('Alice', {
        ...Player,
        wager: UInt,
        deadline: UInt,
        informOfJoiner: Fun([], Null),
    }),

    Participant('Bob', {
        ...Player,
        acceptWager: Fun([UInt], Null),
    }),
];
```

We are going to represent the cost of the wager and the deadline with UInt ([unsigned integer](https://docs.reach.sh/rsh/compute/#rsh_UInt)). Alice will set these two values after creating the contract. There is a function (```informOfJoiner```), that gets called to notify Alice when Bob joins the contract and accepts its terms. There is a function that gives Bob the choice of accepting or rejecting the wager set by Alice. The two participants have five (5) other functions in common that lets them do the following:

    Inform the contract of the number of moves it took them to capture the cat.

    Get informed of a timeout.

    Get informed of a draw.

    Get informed of the winner of the game.

    Observe the number of moves it took their opponent to capture the cat.

## Communication Construction

Now we can design the structure of communication of our application. Try to write this part in accordance with what the flow of the contract would be from start to finish:

**Stop!**
Write down the communication pattern for this program as comments.

Here's what I wrote

> 1. Alice sets the wager and deadline, pays the wager into the contract and deploys the contract.
> 2. Bob accepts the wager, pays the wager into the contract and joins the game.
> 3. Alice gets notified that Bob has joined the game.
> 4. As long as no player has won any round:
>    1. Bob tries capturing the cat and publishes the number of moves it took him to do so.
>    2. Alice tries capturing the cat and also publishes the number of moves it took her to do so.
>    3. Alice and Bob both get informed of the number of moves it took their opponents to capture the cat.
>    4. The contract uses the information available to calculate the outcome of this round to know if there was a draw or if any player won.
>    5. Alice and Bob get informed of the outcome of the round.

The phrase "As long as" indicates a loop going on in the game. Considering that the game can go on and on for an indefinite number of rounds, a loop is the most feasible option for implementing this. The above information would be enough to implement the logic of our contract.

**Stop!**
Write down the communication pattern for this program as code.

Main logic of our contract should now look like:

```javascript
// Enum value that we use to represent the current outcome of the game
const [ isOutcome, A_WINS, B_WINS, CONTINUE, DRAW] = makeEnum(4);

// Function that computes the outcome of a round given the number of moves it took each player to capture the cat.
const getWinner = (numberOfMovesAlice, numberOfMovesBob) => {
  if(numberOfMovesAlice > numberOfMovesBob){
    return B_WINS;
  }
  else if (numberOfMovesAlice < numberOfMovesBob) {
    return A_WINS;
  }
  else return DRAW;
};



// Get wager and deadline from Alice. Alice pays the wager amount to the contract too.
Alice.only(() =>{
    const wager = declassify(interact.wager);
    const deadline = declassify(interact.deadline);
});

Alice.publish(wager, deadline).pay(wager);
commit();


// Bob accepts the wager and pays the wager amount to the contract.
Bob.only(() => {
    interact.acceptWager(wager);
})
Bob.pay(wager);

// Alice gets informed that Bob has accepted the terms of the game.
Alice.interact.informOfJoiner();

var outcome = CONTINUE;
/** There will always be double of the wager amount in the contract since Alice and Bob 
 * both pay the wager into the contract before this point. 
 **/
invariant (balance() == 2 * wager);

while(outcome == CONTINUE || outcome == DRAW) {
    commit();

    // Bob takes first turn by capturing the cat and publishing the number of moves it took him to do so.
    Bob.only(() => {
      const numOfMovesBob = declassify(interact.getNumberOfMoves());
    });
    Bob.publish(numOfMovesBob);
    commit();

    // Alice goes next
    Alice.only(() => {
      const numOfMovesAlice = declassify(interact.getNumberOfMoves());
    });
    Alice.publish(numOfMovesAlice)
    commit();

    // Alice observes the number of moves it took Bob to capture the cat.
    Alice.interact.getOpponentResult(numOfMovesBob);

    // Bob observes the number of moves it took Alice to capture the cat.
    Bob.interact.getOpponentResult(numOfMovesAlice);

    // The contract calculates the outcome of this round using the number of moves published by both players.
    outcome = getWinner(numOfMovesAlice, numOfMovesBob);

    continue;
}
```

In the code, we defined the values that would represent the current outcome of our game using an enum  (```isOutcome```). 

We also defined a function (```getWinner```) that calculates the current outcome of the game by running a comparison of the number of moves published by both players. 
If the number of moves that Alice publishes (```numOfMovesAlice```) is equal to the number of moves that Bob publishes (```numOfMovesBob```), a draw is recorded and
the players have to play again to determine the winner. However, if any of the participants captures the cat with fewer moves than their opponent in any round, they win the game.

Within the while loop, both players are given the opportunity to publish the number of moves it took them to capture the cat (```getNumberOfMoves```) and get updates on the opponent's number of moves (```getOpponentResult```).

## Assertion Insertion

In addition to the invariant assertion we defined for our loop like this:
```javascript
invariant (balance() == 2 * wager);
```
We can add an extra assertion that ensures that the value passed to our ```outcome``` variable is always one of the possible values of our enum ```isOutcome```, thus:

```javascript
invariant (balance() == 2 * wager && isOutcome(outcome));
```

## Possible Additions

So far, our code works fine. But there are some points we can improve.

One improvement is to enforce a timeout limit on each player to make sure that they don't take too long to play their move or worse, abandon a game midway. Of course, we will need a means to inform both players when a timeout occurs. For that, we will define a function thus:

```javascript
// ...

const informTimeout = () => {
    each([Alice, Bob], () => {
      interact.informTimeout();
    });
};

// ...
```

To implement the timeout, we will use the ```deadline``` value that Alice created the contract with. 

The timeout will be enforced when - 

* Bob is to pay the wager:

```javascript
// ...

Bob.only(() => {
    interact.acceptWager(wager);
})
Bob.pay(wager)
    .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));

// ...
```

* Bob is to make his move:

```javascript
// ...

Bob.only(() => {
    const numOfMovesBob = declassify(interact.getNumberOfMoves());
});

Bob.publish(numOfMovesBob)
    .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));
commit();

// ...
```

* Alice is to make her move:

```javascript
// ...

Alice.only(() => {
    const numOfMovesAlice = declassify(interact.getNumberOfMoves());
});
Alice.publish(numOfMovesAlice)
    .timeout(relativeTime(deadline), () => closeTo(Bob, informTimeout));

// ...
```

In addition, we can define two functions that inform the players when there is a draw or when a winner is announced:

```javascript
// ...

const announceWinner = (designation) => {
    each([Alice, Bob], () => {
        interact.declareWinner(designation);
    });
};

const informDraw = () => {
    each([Alice, Bob], () => {
        interact.informDraw();
    });
};

//...
```

With all of these changes, our backend will look like this

```javascript
const [ isOutcome, A_WINS, B_WINS, CONTINUE, DRAW] = makeEnum(4);

const getWinner = (numberOfMovesAlice, numberOfMovesBob) => {
  if(numberOfMovesAlice > numberOfMovesBob){
    return B_WINS;
  }
  else if (numberOfMovesAlice < numberOfMovesBob) {
    return A_WINS;
  }
  else return DRAW;
};


const Player = {
  ...hasRandom,
  getNumberOfMoves: Fun([], UInt),
  informTimeout: Fun([], Null),
  informDraw: Fun([], Null),
  declareWinner: Fun([UInt], Null),
  getOpponentResult: Fun([UInt], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    ...Player,
    wager: UInt,
    deadline: UInt,
    informOfJoiner: Fun([], Null),
  });
  const Bob = Participant('Bob', {
    ...Player,
    acceptWager: Fun([UInt], Null),
  });

  const informTimeout = () => {
    each([Alice, Bob], () => {
      interact.informTimeout();
    });
  };

  const announceWinner = (designation) => {
    each([Alice, Bob], () => {
        interact.declareWinner(designation);
    });
  };

  const informDraw = () => {
    each([Alice, Bob], () => {
      interact.informDraw();
    });
  };

  init();

  Alice
    .only(() =>{
      const wager = declassify(interact.wager);
      const deadline = declassify(interact.deadline);
  });

  Alice
    .publish(wager, deadline)
    .pay(wager);
  commit();

  Bob.only(() => {
    interact.acceptWager(wager);
  })
  Bob.pay(wager)
    .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));
  
  Alice.interact.informOfJoiner();

  var outcome = CONTINUE;

  invariant (balance() == 2 * wager && isOutcome(outcome));

  while(outcome == CONTINUE || outcome == DRAW) {
    commit();

    if (outcome == DRAW) {
      informDraw();
    }
  
    Bob.only(() => {
      const numOfMovesBob = declassify(interact.getNumberOfMoves());
    });

    Bob.publish(numOfMovesBob)
      .timeout(relativeTime(deadline), () => closeTo(Alice, informTimeout));
    commit();

    Alice.only(() => {
      const numOfMovesAlice = declassify(interact.getNumberOfMoves());
    });
    Alice.publish(numOfMovesAlice)
      .timeout(relativeTime(deadline), () => closeTo(Bob, informTimeout));

    Alice.interact.getOpponentResult(numOfMovesBob);
    Bob.interact.getOpponentResult(numOfMovesAlice);

    outcome = getWinner(numOfMovesAlice, numOfMovesBob);

    continue;
  }

  transfer(2 * wager).to(outcome == A_WINS ? Alice : Bob);
  announceWinner(outcome);

  commit();
});
```

## Interaction Introduction
Now that we have a complete contract, we can write the frontend. Since we'll be interacting with an API to play the actual Le Chat Noir game, using a web frontend library is a better choice. In our case it will be React. The code below was written using Typescript. For state management, the redux library was used.

**Stop!**
Insert `interact` calls to the [frontend](https://docs.reach.sh/ref-model.html#(tech._frontend)) into the program.

```javascript
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

```

---
## Discussion

Congrats for making it to the end of the workshop. You succeeded in implementing the Le-Chat-Noir game to run on the blockchain all by yourself!

The same concept can be implemented for a wide variety of board games like chess, checkers, backgammon etc.

If you found this workshop rewarding, please let us know on [the Discord community](https://discord.gg/AZsgcXu)!
If you want to know what to do next, you should check out squidKid's [Tic-Tac-Toe](https://github.com/squidKid-deluxe/reach--tic-tac-toe) and other workshops.
(There should be the link of squid's workshop too)
See you around 😉