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
* What functions/values do the two players need to inform the contract of the number of pieces they have and assume their opponent has?

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

We are going to represent the cost of the wager and the deadline with UInt (unsigned integer). Alice will set these two values after creating the contract. There is a function ('informOfJoiner'), that gets called to notify Alice when Bob joins the contract and accepts its terms. There is a function that gives Bob the choice of accepting or rejecting the wager set by Alice. The two participants have five (5) other functions in common that lets them do the following:

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
