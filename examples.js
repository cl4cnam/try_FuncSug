examples = {
	empty: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,``
	],
	//=============================
	helloWorld: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Hello, World!')`
	],
	//=============================
	helloYou: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('What is your name?')
var theName := awaitHumanText()
displayNewMessage('Hello, ' + theName + '!')`
	],
	//=============================
	helloYouLessIndiscreet: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,`.final {
	background-color: #80ffff;
	margin: auto;
}`,``,`displayNewMessage('What is your name?')
parallel exitAfter 1 finished ||
	var theName := awaitHumanText()
	displayNewMessage('Hello, ' + theName + '!')
||
	waitSeconds(5)
	displayNewMessage("Oops, maybe, I'm being too indiscreet!")

# '.final' is defined in the 'CSS' tab
displayNewMessageIn('--- The End ---', 'body/final')`
	],
	//=============================
	guessNumber: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`var numberToGuess := randomIntBetween(1, 100)
var triedNumber := 0
displayNewMessage('Guess my number (between 1 and 100)!')

while triedNumber != numberToGuess:
	
	triedNumber := awaitHumanText()
	
	if triedNumber < numberToGuess:
		displayNewMessage('Too low! Try again!')
	if triedNumber > numberToGuess:
		displayNewMessage('Too high! Try again!')
	if triedNumber = numberToGuess:
		displayNewMessage('Well Done!')`
	],
	//=============================
	buttonSequence: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<button id="button1" disabled>Button #1</button>
		<button id="button2" disabled>Button #2</button>
		<button id="button3" disabled>Button #3</button>
	</body>
</html>`,``,``,`while true:
	awaitClickBeep('#button1')
	awaitClickBeep('#button2')
	awaitClickBeep('#button3')
	displayNewMessage('Well Done!')`
	],
	//=============================
	simpleChoice: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('<button id="A">I choose A</button> <button id="B">I choose B</button>')

parallel(select 1) ||
||=================
	awaitClickBeep('#A')
...---
	displayNewMessage("You've chosen A")
||================
	awaitClickBeep('#B')
...---
	displayNewMessage("You've chosen B")`
	],
	//=============================
	lessSimpleChoice: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage(\`
	<button id="A">I choose A</button>
	<button id="B">I choose B</button>
\`)

parallel(select 1) ||
||=================
	awaitClickBeep('#A')
	displayNewMessage('<button id="Aconfirmed">Yes, I choose A</button>')
	awaitClickBeep('#Aconfirmed')
...---
	displayNewMessage("You've chosen A")
||================
	awaitClickBeep('#B')
...---
	displayNewMessage("You've chosen B")
||================
	waitSeconds(5)
...---
	displayNewMessage("You've hesitated")`
	],
	//=============================
	hand: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<p id="question"></p>
		<button id="sockButton" disabled>Socks</button>
		<button id="gloveButton" disabled>Gloves</button>
		<p id="response"></p>
		<p id="end"></p>
	</body>
</html>`,``,``,`# This seems to work only because the executions of 'displayNewMessage("Oh, yes..."/"Yes...")' don't last long

# 1) Display the question
#------------------------
displayMessageIn('What is put on hands?', '#question')

# 2) Handle the response
#-----------------------
parallel exitAfter 1 finished ||
	awaitClickBeep('#sockButton')
	displayMessageIn("Oh, yes, as a base for puppets!", '#response')
||
	awaitClickBeep('#gloveButton')
	displayMessageIn("Yes, when it's cold.", '#response')

# 3) Announce the end
#--------------------
displayMessageIn('--- THE END ---', '#end')`
	],
	//=============================
	handBetter: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<p id="question"></p>
		<button id="sockButton" disabled>Socks</button>
		<button id="gloveButton" disabled>Gloves</button>
		<p id="response"></p>
		<p id="end"></p>
	</body>
</html>`,``,``,`# 1) Display the question
#------------------------
displayMessageIn('What is put on hands?', '#question')

# 2) Handle the response
#-----------------------
parallel(select 1) ||
||===============================
	awaitClickBeep('#sockButton')
...---
	displayMessageIn("Oh, yes, as a base for puppets!", '#response')
||================================
	awaitClickBeep('#gloveButton')
...---
	displayMessageIn("Yes, when it's cold.", '#response')

# 3) Announce the end
#--------------------
displayMessageIn('--- THE END ---', '#end')`
	],
	//=============================
	drinkingCow: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`# This seems to work only because the executions of 'displayNewMessage(resp.../"Water")' don't last long

displayNewMessage("What does a cow drink?")

parallel exitAfter 1 finished ||
	var response := awaitHumanText()
	displayNewMessage(response + " ... Oh, I didn't know that!")
||
	waitSeconds(5)
	displayNewMessage("Water")`
	],
	//=============================
	drinkingCowBetter: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,`.canceled {text-decoration-line: line-through;}`,``,`displayNewMessage("What does a cow drink?")

parallel(select 1) ||
||==================================
	var response := awaitHumanText()
...-----
	displayNewMessage(response + " ... Oh, I didn't know that!")
||=====================
	waitSeconds(5)
...-----
	displayNewMessage("Water")`
	],
	//=============================
	ticTacToe: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<div id="gameTable">
			<div id="1_1"></div>
			<div id="1_2"></div>
			<div id="1_3"></div>
			<div id="2_1"></div>
			<div id="2_2"></div>
			<div id="2_3"></div>
			<div id="3_1"></div>
			<div id="3_2"></div>
			<div id="3_3"></div>
		</div>
		<p id="message"></p>
	</body>
</html>`,`#gameTable {
	display: inline-grid;
	grid-template-columns: 165px 165px 165px;
	row-gap: 20px;
}

#gameTable > div {
	width: 145px;
	height: 215px;
	background-color: #cff;
}

#message {
	display: inline-grid;
	padding: 10px;
	font-size: 30px;
	background-color: #cfc;
	border-radius: 10px;
}
`,`function imageOf(player) {
	return {Flower: 'img/card5.jpg', Mushroom: 'img/card2.jpg'}[player]
}

function otherPlayer(player) {
	return {Flower: 'Mushroom', Mushroom: 'Flower'}[player]
}

function allEquals(array) {
	return array.every(e=>(array[0] !== undefined && e === array[0]))
}

function checkWin(board) {
	const combinationsList = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
	for (const combination of combinationsList) {
		const playerCombination = combination.map(i=>board[i].player)
		if (allEquals(playerCombination)) return playerCombination[0]
	}
	return false
}`,`var player := 'Flower'
displayMessageIn('Flower is up', '#message')

var cardList := js ():
	return document.querySelectorAll('#gameTable > div')
var remainingCards := listToPar(cardList)

var winner
while not isNovalue(remainingCards):
	parallel(for card in remainingCards, select 1):
		select:
			awaitClickBeep(card)
		do:
			displayMessageIn('<img src="' + (calljs imageOf(player)) + '">', card)
			card.player := player
			remainingCards := valuesFrom(remainingCards, 'butNotFrom', card)
	winner := calljs checkWin(cardList)
	if winner:
		remainingCards := | |
	else:
		player := calljs otherPlayer(player)
		displayMessageIn(player + ' is up', '#message')

if winner:
	displayMessageIn(winner + ' wins', '#message')
else:
	displayMessageIn('Draw', '#message')`
	],
	//=============================
	memory: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<div id="gameTable"></div>
	</body>
</html>`,`body {text-align: center}
table {margin: auto}
.clicked {
	outline: dashed blue 3px;
	filter: opacity(50%);
}
img.OK {
	outline: none;
	filter: none;
}
`,`// Available images in this test environment:
// img/cardBack.svg, img/card1.jpg, ..., img/card7.jpg

function makeCardDeck(p_numberOfCopy) {
	// Each card has a back and a face
	const cardDeck = []
	for(let copy=1; copy<=p_numberOfCopy; copy++){
		for( let cardNum=1; cardNum<=7; cardNum++){
			cardDeck.push({back : "cardBack.svg", face : "card"+ cardNum +".jpg" });
		}
	}
	return cardDeck
}

function shuffleCards(p_cardDeck) {
	// shuffle the deck
	//~ copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	for (let i = p_cardDeck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[p_cardDeck[i], p_cardDeck[j]] = [p_cardDeck[j], p_cardDeck[i]];
	}
}

function distributeCards(p_cardDeck) {
	// place all the cards face downward onto the game table
		const gameTable = document.getElementById("gameTable");
		for(let card of p_cardDeck){
			const cardElement = document.createElement('img');
			cardElement.src= "img/" + card.back
			card.cardElement = cardElement
			gameTable.appendChild(cardElement)
		}
}

function showFace(p_card) {
	p_card.cardElement.src = "img/" + p_card.face
}

function showBack(p_card) {
	p_card.cardElement.src = "img/" + p_card.back
}`,`# Prepare game table
#=======================

var numberOfCopy := 3

var cardDeck := calljs makeCardDeck(numberOfCopy)

# shuffle deck
calljs shuffleCards(cardDeck)

# place cards face downward onto the game table
calljs distributeCards(cardDeck)

# Start of game
#=======================

# transform JavaScript Array into FuncSug "parallel list"
var allRemainingCards := listToPar(cardDeck)
# now, allRemainingCards is a "parallel list" of all cards placed on the table

while not isNovalue(allRemainingCards):
	
	# choose numberOfCopy cards
	#--------------------------
	
	# This block:
	#    parallel(for <variable1> in <variable2>, select <number>):
	#        select:
	#            <instructions1>
	#        do:
	#            <instructions2>
	# launches, in parallel, a sequence of "<instructions1> then <instructions2>" for each value of <variable2>
	#     and when <number> branches (called "selected branches") have reached the end of <instructions1>, all others branches are definitively interrupted
	# When all the "selected branches" are finished, the "parallel" block finishes and returns a "concatenation" of the returns of all the "selected branches"
	
	var allClickedCards := parallel(for anyCard in allRemainingCards, select numberOfCopy):
		select:
			awaitClickBeep(anyCard.cardElement)
		do:
			calljs showFace(anyCard)
			# return the clicked card (which is then "concatenated" to allClickedCards by "allClickedCards := parallel()...")
			anyCard

	# Compare visible faces
	#----------------------
	if allEqual(allClickedCards.face):
		js (allClickedCards):
			allClickedCards.cardElement.classList.add('OK')
		allRemainingCards := valuesFrom(allRemainingCards, 'butNotFrom', allClickedCards)
	else:
		waitSeconds(1)
		calljs showBack(allClickedCards)

displayNewMessage('Congratulations, you have found all identical cards!')
`
	],
	//=============================
	calljs: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,`function square(n) {
	return n*n
}`,`var number := 5

# 'square' is defined in the 'JavaScript' tab
displayNewMessage(   'square of ' + number + ': ' + ( calljs square(number) )   )`
	],
	//=============================
	js: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`var a := 2025
var b := js (a):
	return Math.sqrt(a)
displayNewMessage('sqrt(' + a + ') = ' + b)`
	],
	//=============================
	soundSequence: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`# Available sounds in this test environment:
# castanets(8s), dingding(12s), harmonica(7s), rattle(3s), saw(10s), shshsh(4s) squeak(6s), tactactac(4s)

displayNewMessage('Starting sounds...')

playSoundFile('rattle.mp3')
playSoundFile('tactactac.mp3')
playSoundFile('dingding.mp3')

displayNewMessage('--- The End ---')`
	],
	//=============================
	soundParallel: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`# Available sounds in this test environment:
# castanets(8s), dingding(12s), harmonica(7s), rattle(3s), saw(10s), shshsh(4s) squeak(6s), tactactac(4s)

displayNewMessage('Starting sounds...')

parallel ||
	playSoundFile('rattle.mp3')
||
	playSoundFile('tactactac.mp3')
||
	playSoundFile('dingding.mp3')

displayNewMessage('--- The End ---')`
	],
	//=============================
	soundParallelMin: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`# Available sounds in this test environment:
# castanets(8s), dingding(12s), harmonica(7s), rattle(3s), saw(10s), shshsh(4s) squeak(6s), tactactac(4s)

displayNewMessage('Starting sounds...')

parallel exitAfter 1 finished ||
	playSoundFile('rattle.mp3')
||
	playSoundFile('tactactac.mp3')
||
	playSoundFile('dingding.mp3')

displayNewMessage('--- The End ---')`
	],
	//=============================
	parallel: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Please, wait...')

parallel ||
	waitSeconds(5)
||
	waitSeconds(1)

displayNewMessage('Both branches are terminated')

displayNewMessage('--- The End ---')`
	],
	//=============================
	parallelReturn: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Please, wait...')

var result := parallel ||
	waitSeconds(5)
	'value #1'
||
	waitSeconds(1)
	'value #2'

displayNewMessage('Both branches are terminated')
displayNewMessage(result)

displayNewMessage('--- The End ---')`
	],
	//=============================
	parallelAfter: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Please, wait...')

parallel exitAfter 1 finished ||
	waitSeconds(5)
||
	waitSeconds(1)

displayNewMessage('A branch is terminated')

displayNewMessage('--- The End ---')`
	],
	//=============================
	parallelWith: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Please, wait...')

parallel exitWith branch 2 ||
	waitSeconds(10)
||
	waitSeconds(5)
||
	waitSeconds(1)
||
	waitSeconds(20)

displayNewMessage('Branch #2 is terminated')

displayNewMessage('--- The End ---')`
	],
	//=============================
	parallelSelect: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Please, wait...')

var speedyCar := parallel(select 2) ||
||=================
	waitSeconds(10)
...---
	displayNewMessage("You can't see me because I'm too late: My branch won't be selected")
	'car #1'
||================
	waitSeconds(5)
...---
	displayNewMessage("I (car #2) am in a selected branch")
	'car #2'
||================
	waitSeconds(1)
...---
	displayNewMessage("I (car #3) am in a selected branch")
	'car #3'
||=================
	waitSeconds(20)
...---
	displayNewMessage("You can't see me because I'm too late: My branch won't be selected")
	'car #4'

displayNewMessage(speedyCar + ' is a speedy car')

displayNewMessage('--- The End ---')`
	],
	//=============================
	break: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Please, wait...')

var myBranch

parallel ||
	@myBranch
	waitSeconds(2)
	displayNewMessage("You can't see me because my branch has been broken")
||
	waitSeconds(1)
	break myBranch

displayNewMessage('--- The End ---')`
	],
	//=============================
	awaitClickBip: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<button disabled>Click me!</button>
	</body>
</html>`,``,``,`displayNewMessage('Note: the button is disabled by HTML code!')
displayNewMessage('Please, wait 5 seconds..., the button will be enabled!')
waitSeconds(5)

# the argument of awaitClickBip has to be a HTMLElement or a CSS selector
awaitClickBip('button')

displayNewMessage('Note that the button is disabled again!')
displayNewMessage('--- The End ---')`
	],
	//=============================
	awaitVariable: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Please, wait...')

var myVariable

parallel ||
	waitSeconds(2)
	myVariable := 'Anything'
||
	displayNewMessage("Before the change of myVariable")
	# await a change of myVariable
	awaitBip myVariable
	displayNewMessage("myVariable has just been changed")

displayNewMessage('--- The End ---')`
	],
	//=============================
	awaitBool: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Please, wait...')

var myVariable

parallel ||
	waitSeconds(5)
	myVariable := 'A'
	displayNewMessage("This ('A') does not work: 'B' is awaited")
	
	waitSeconds(5)
	myVariable := 'B'
||
	displayNewMessage("Before myVariable is 'B'")
	# await a boolean condition
	awaitBool (myVariable = 'B')
	displayNewMessage("Now, myVariable is 'B'")

displayNewMessage('--- The End ---')`
	],
	//=============================
	helloWorldAndOthersSeq1: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage('Hello, World!')
displayNewMessage("Hello to the others!")
displayNewMessage("--- THE END ---")`
	],
	//=============================
	helloWorldAndOthersSeq2: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`# Function definition
#---------------
def showNewMessage5Seconds(p_message):
	parallel exitWith branch 1 ||
		waitSeconds(5)
	||
		showNewElementIn(p_message, 'body', 'p', true, 'forever')

# Main program
#-------------
showNewMessage5Seconds("Hello, World!")
showNewMessage5Seconds("Hello to the others!")
displayNewMessage("--- THE END ---")`
	],
	//=============================
	helloWorldAndOthersPar1: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`# No noticeable differences with the sequential version. Can we call "displayNewMessage" an asynchronous-effect function?
parallel ||
	displayNewMessage("Hello, World!")
||
	displayNewMessage("Hello to the others!")
displayNewMessage("--- THE END ---")`
	],
	//=============================
	helloWorldAndOthersPar2: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`# Function definition
#---------------
def showNewMessage5Seconds(p_message):
	parallel exitWith branch 1 ||
		waitSeconds(5)
	||
		showNewElementIn(p_message, 'body', 'p', true, 'forever')

# Main program
#-------------
parallel ||
	showNewMessage5Seconds("Hello, World!")
||
	showNewMessage5Seconds("Hello to the others!")
displayNewMessage("--- THE END ---")`
	],
	//=============================
	tbcDemo0: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<button id="b0" disabled>Zero</button>
		<button id="b1a" disabled>One A</button>
		<button id="b1b" disabled>One B</button>
		<button id="b2" disabled>Two</button>
	</body>
</html>`,``,``,`var msg := displayNewMessage('')
while true:
	awaitClickBeep('#b0')
	displayMessageIn('0', msg)
	parallel exitAfter 1 finished ||
		awaitClickBeep('#b1a')
		displayMessageIn('1A', msg)
	||
		awaitClickBeep('#b1b')
		displayMessageIn('1B', msg)
	awaitClickBeep('#b2')
	displayMessageIn('2', msg)`
	],
	//=============================
	tbcDemo1: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<button id="b0" disabled>Zero</button>
		<button id="b1a" disabled>One A</button>
		<button id="b1b" disabled>One B</button>
		<button id="b2" disabled>Two</button>
	</body>
</html>`,``,``,`var msg := displayNewMessage('')
while true:
	var waitingLoop
	while true: @waitingLoop
		parallel exitAfter 1 finished ||
			awaitClickBip('#b0')
			displayMessageIn('0', msg)
			break waitingLoop
		||
			waitSeconds(1.5)
		displayMessageIn('hurry up', msg)
		waitSeconds(2.5)
		displayMessageIn('', msg)
	parallel exitAfter 1 finished ||
		awaitClickBeep('#b1a')
		displayMessageIn('1A', msg)
	||
		awaitClickBeep('#b1b')
		displayMessageIn('1B', msg)
	||
		waitSeconds(2)
		displayMessageIn('too slow', msg)
	awaitClickBeep('#b2')
	displayMessageIn('2', msg)`
	],
	//=============================
	tbcDemo2: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`while true:
	parallel ||
		displayNewMessage('x0')
		waitSeconds(1)
		displayNewMessage('x1')
	||
		displayNewMessage('y0')
		waitSeconds(1)
		displayNewMessage('y1')
	waitSeconds(1)`
	],
	//=============================
	tbcDemo3: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`while true:
	displayMessageIn('', 'body')
	displayNewMessage('What is your name?')
	var name := awaitHumanText()
	displayNewMessage('Hello ' + name)
	waitSeconds(1)`
	],
}
