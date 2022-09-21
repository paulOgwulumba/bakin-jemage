/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'reach 0.1';

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