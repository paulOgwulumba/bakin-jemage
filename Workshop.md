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
	
	During the course of the game, each player is going to know how many moves it took their opponent to capture the cat.
	
	The two players will both pay the wager and the winner of the game would get paid both players' wagers as a reward.  

It is completely okay if your answers differ from mine. If you're confident that your answers are correct, you can continue with them through this workshop.
