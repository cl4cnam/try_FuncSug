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
	helloYouLessIndiscreetBetter: ['text',
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

# parallel(select N)
# ------------------
#     As soon as any N of the branches reaches "...---", all the other branches are definitively interrupted

parallel(select 1) ||
||============
	var theName := awaitHumanText()
...---
	displayNewMessage('Hello, ' + theName + '!')
||============
	waitSeconds(5)
...---
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
	sequentialButtons: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`#-------------
# Preparation
#-------------
displayNewMessage('Click all the buttons <strong>in order</strong>')

displayNewHtml(\`
	<button id="button1" disabled>Button 1</button>
	<button id="button2" disabled>Button 2</button>
	<button id="button3" disabled>Button 3</button>
	<button id="button4" disabled>Button 4</button>
\`)

#-----------
# Waiting
#-----------
# All the buttons are waiting to be clicked one by one, in order
awaitClickBeep('#button1')
awaitClickBeep('#button2')
awaitClickBeep('#button3')
awaitClickBeep('#button4')

displayNewMessage('Well done!')`
	],
	//=============================
	parallelAndButtons: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`#-------------
# Preparation
#-------------
displayNewMessage('Click all the buttons in <strong>any</strong> order')

displayNewHtml(\`
	<button id="button1" disabled>Button 1</button>
	<button id="button2" disabled>Button 2</button>
	<button id="button3" disabled>Button 3</button>
	<button id="button4" disabled>Button 4</button>
\`)

#-----------
# Waiting
#-----------
# All the buttons are simultaneously waiting to be clicked, and none gives up
parallel:
	awaitClickBeep('#button1')
	awaitClickBeep('#button2')
	awaitClickBeep('#button3')
	awaitClickBeep('#button4')

displayNewMessage('Well done!')`
	],
	//=============================
	parallelOrButtons: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`#-------------
# Preparation
#-------------
displayNewMessage('Click any one button')

displayNewHtml(\`
	<button id="button1" disabled>Button 1</button>
	<button id="button2" disabled>Button 2</button>
	<button id="button3" disabled>Button 3</button>
	<button id="button4" disabled>Button 4</button>
\`)

#-----------
# Waiting
#-----------
# All the buttons are simultaneously waiting to be clicked, but give up as soon as another is clicked
parallel exitAfter 1 finished:
	awaitClickBeep('#button1')
	awaitClickBeep('#button2')
	awaitClickBeep('#button3')
	awaitClickBeep('#button4')

displayNewMessage('Well done!')`
	],
	//=============================
	parallelOr2Buttons: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`#-------------
# Preparation
#-------------
displayNewMessage('Click any two buttons')

displayNewHtml(\`
	<button id="button1" disabled>Button 1</button>
	<button id="button2" disabled>Button 2</button>
	<button id="button3" disabled>Button 3</button>
	<button id="button4" disabled>Button 4</button>
\`)

#-----------
# Waiting
#-----------
# All the buttons are simultaneously waiting to be clicked, but give up as soon as two others are clicked
parallel exitAfter 2 finished:
	awaitClickBeep('#button1')
	awaitClickBeep('#button2')
	awaitClickBeep('#button3')
	awaitClickBeep('#button4')

displayNewMessage('Well done!')`
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
</html>`,``,``,`# If this seems to work, it's only because the executions of 'displayNewMessage("Oh, yes..."/"Yes...")' don't last long

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
</html>`,``,``,`# If this seems to work, it's only because the executions of 'displayNewMessage(response.../"Water")' don't last long

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
	wonderland: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,`button {
	margin: 10px;
	&.clicked {
		color: green;
		font-weight: bold;
	}
}
.final {
	background-color: #80ffff;
	margin: auto;
}`,``,`var choiceSpace

def askForChoice(p_question):
	displayNewMessage(p_question)
	choiceSpace := displayNewMessageIn('', 'body/self')

def waitForChoice(p_message):
	awaitClickBeep(displayNewElementIn(p_message, choiceSpace, 'button', true))

def display(p_message):
	displayNewMessage(p_message)
	waitSeconds(2)

display("Hello! You've just arrived in Wonderland.")
display("You're at a crossroads.")
askForChoice('Which direction are you choosing?')
parallel(select 1) ||
||==================================
	waitForChoice('The rabbit')
...-----
	display("Oh! It's your unbirthday!")
	display('Have a good time!')
||==================================
	waitForChoice('The house')
...-----
	display("Oh! What a beautiful house!")
	askForChoice('But... What are you eating?')
	parallel(select 1) ||
	||=====================
		waitForChoice('An apple')
	...-----
		display('Oh! What! Everything is growing around you!')
		display("No, it's you who's shrinking!")
		display("Oh! Two doors in front of you!")
		askForChoice('Which are you passing through?')
		parallel(select 1) ||
		||=============
			waitForChoice('The green one')
		...---
			display("Oh! What a beautiful garden!")
			display('Have a good journey!')
		||=============
			waitForChoice('The pink one')
		...---
			display("Oh! What a beautiful sea!")
			display('Have a good journey!')
	||=====================
		waitForChoice('A pear')
	...-----
		display("Ouch! What's hurting you?")
		display("It's the ceiling! You're too tall.")
		display("Fortunately, the ceiling is not very solid.")
		display("Now that you are a giant, you can see the whole country.")
		display('Have a good journey!')
displayNewMessageIn('--- The End ---', 'body/final')`
	],
	//=============================
	chaseButton: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,`#gameTable {
	display: flex;
	flex-flow: row wrap;
	button {
		padding: 10px;
		margin: 10px;
	}
}`,`function makeButtons(howMany) {
	return '<button disabled> </button>'.repeat(howMany)
}`,`var numberOfButtons := 200

displayNewMessage('Chase the button!')
displayNewHtmlIn('<div id="gameTable"></div>', 'body')
displayNewHtmlIn(calljs makeButtons(numberOfButtons), '#gameTable')

while true:
	var buttonNum := randomIntBetween(1, numberOfButtons)
	awaitClickBeep('#gameTable > button:nth-of-type(' + buttonNum + ')')

# Try to make this program in JavaScript/DOM or your favorite programming language!`
	],
	//=============================
	find3Button: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,`#gameTable {
	display: flex;
	flex-flow: row wrap;
	button {
		padding: 10px;
		margin: 10px;
	}
}

.popup {
	position: fixed; top: 30%; left: 50%; display: inline-table; z-index: 100; margin-left: -25%;
	background-color: #ffc; border-color: #cc8;
}

#gameTable:not(:last-child) {
	background-color: #eee;
	& > button {
		visibility: hidden;
	}
}`,`function makeButtons(howMany) {
	return '<button disabled> </button>'.repeat(howMany)
}

function threeRandomNumber(max) {
	const result = []
	for (let i=0; i<3; i++) {
		while (!result[i]) {
			const rand = Math.floor( (max)*Math.random()+1 )
			if (!result.includes(rand)) result.push(rand)
		}
	}
	return result
}`,`var numberOfButtons := 200

displayNewMessage('Find the three buttons!')
displayNewHtmlIn('<div id="gameTable"></div>', 'body')
displayNewHtmlIn(calljs makeButtons(numberOfButtons), '#gameTable')

while true:
	var buttonNum := listToPar(calljs threeRandomNumber(numberOfButtons))
	parallel forEachValueOf buttonNum:
		awaitClickBeep('#gameTable > button:nth-of-type(' + buttonNum + ')')
	showNewElementIn('Congratulations!', 'body', 'p/popup', false, 'untilClick')

# Try to make this program in JavaScript/DOM or your favorite programming language!`
	],
	//=============================
	crossRiver: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<svg width="800" height="600" fill="#0f0" stroke="gray">
			<rect x="0" y="0" width="800" height="600" />
			<rect x="200" y="0" width="400" height="600" fill="#0ff" stroke="#0ff" />
		</svg>
		<button id="stone1" disabled></button>
		<button id="stone2" disabled></button>
		<button id="stone3" disabled></button>
		<button id="stone4" disabled></button>
		<button id="stone5" disabled></button>
		<svg id="frog" width="80" height="80" fill="#0c0" stroke="gray">
			<circle cy="35" cx="20" r="10" />
			<circle cy="65" cx="20" r="10" />
			<circle cy="50" cx="50" r="15" />
			<circle cy="40" cx="62" r="5" fill="white" />
			<circle cy="60" cx="62" r="5" fill="white" />
			<circle cy="40" cx="65" r="3" fill="black" />
			<circle cy="60" cx="65" r="3" fill="black" />
			<circle cy="50" cx="30" r="20" />
		</svg>
	</body>
</html>`,`body {
	position: relative;
}
svg {
	position: absolute; top: 0; left: 0;
	margin: 0; padding: 0;
}
button {
	position: absolute; top: 210px;
	width: 80px; height: 80px;
	border-radius: 30px;
	background-color: #eee;
	border: outset 2px #eee;
	&:disabled {background-color: #ccc; border: solid #ccc}
}
#stone1 {left: 210px}
#stone2 {left: 310px}
#stone3 {left: 410px}
#stone4 {left: 510px}
#stone5 {
	left: 610px;
	background-color: #00ee00;
	&:disabled {background-color: #00e000; border: solid #00e000}
}
#frog {top: 200px; left: 112px}
.init {position: absolute; top: 100px; left: 100px; background-color: white; max-width: 200px}
.final {position: absolute; top: 110px; left: 600px; background-color: white; max-width: 100px}
`,`function goToStone(num) {
	document.getElementById('frog').style.left = "" + (112+100*num) + "px"
}
`,`var num := 0
var initMessage := displayNewMessageIn('I want to cross the river.<br>Help me! Please!', 'body/init')
repeat 5:
	num += 1
	awaitClickBeep('#stone' + num)
	removeElt(initMessage)
	calljs goToStone(num)
displayNewMessageIn('Thanks! 🙂', 'body/final')`
	],
	//=============================
	coloringBook: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,`#palette {
	position: fixed; top: 0; left: 0; display: inline-table; z-index: 100;
}
`,`const ALL_COLORS = ['purple', 'magenta', 'red', 'orange', 'yellow', 'lime', 'green', 'cyan', 'blue', 'brown', 'white', 'silver', 'black']

function setCursorColor(color) {
	const cursor = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath fill='%23fed' stroke='black' d='m 0,0 20,0 12,12 0,20 -20,0 -12,-12 z'/%3E%3Ccircle fill='\` + color + \`' stroke='black' cx='0' cy='0' r='20'/%3E%3Cpath stroke='black' fill='none' d='m 20,0 -20,0 0,20' /%3E%3C/svg%3E") 0 0, pointer\`
	document.body.style.cursor = cursor
}

function getDot(color, position) {
	return \`<circle cx="\${position*25+20}" cy="20" r="10" fill="\${color}" stroke="black">\${color}</circle>\`
}

function getRowOfDots() {
	return '<svg id="palette" width="' + ALL_COLORS.length*30 + '" height="40">' + ALL_COLORS.map((e,i)=>getDot(e, i)).join('') + '</svg>'
}
`,`displayNewHtmlIn(calljs getRowOfDots(), 'body')
var svgText := awaitFileContent('img/coloringDog.svg', 'text')
displayNewHtmlIn(svgText, 'body')
var color := 'white'
calljs setCursorColor(color)

parallel:
	while true:
		var paletteEvt := awaitDomeventBeep('mousedown', '#palette')
		var palettePart := paletteEvt.target
		color := palettePart.innerHTML
		calljs setCursorColor(color)
	while true:
		var drawingEvt := awaitDomeventBeep('mousedown', '#drawing')
		var drawingPart := drawingEvt.target
		drawingPart.style.fill := color
`
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

var aligner
while not isNovalue(remainingCards):
	parallel(for card in remainingCards, select 1):
		select:
			awaitClickBeep(card)
		do:
			displayMessageIn('<img src="' + (calljs imageOf(player)) + '">', card)
			card.player := player
			remainingCards := valuesFrom(remainingCards, 'butNotFrom', card)
	aligner := calljs checkWin(cardList)
	if aligner:
		remainingCards := | |
	else:
		player := calljs otherPlayer(player)
		displayMessageIn(player + ' is up', '#message')

if aligner:
	displayMessageIn('Three aligned ' + aligner + 's', '#message')
else:
	displayMessageIn('No alignment', '#message')`
	],
	//=============================
	puzzle15: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<div id="gameTable">
		</div>
	</body>
</html>`,`#gameTable {
	display: inline-grid;
	row-gap: 10px;
}

#gameTable > button {
	width: 50px;
	height: 50px;
}

#gameTable > button:empty {
	visibility: hidden;
}
`,`const $ = document.getElementById.bind(document)

// Parameters
//------------
const width = 4
const height = 4
const size = width*height-1

// Make cards
//------------
const gameTable = $('gameTable')
gameTable.style.gridTemplateColumns = 'repeat(' + width + ', 60px)'
for (let i=0; i<size; i++) {
	gameTable.innerHTML += '<button id="' + i + '" disabled>' + (i+1) + '</button>'
}
gameTable.innerHTML += '<button id="' + size + '" disabled></button>'
const buttonList = document.querySelectorAll('#gameTable > button')
const emptyButton = $(''+size)

// Utils functions
//-----------------
function idToXy(id) {
	return [id%width, Math.floor(id/width)]
}

function xyToId(x,y) {
	return '' + (width*y + x)
}

function getAdjacentButtons(button) {
	const [x,y] = idToXy(button.id)
	const inTheXFrame = n=>(0<=n && n <width)
	const inTheYFrame = n=>(0<=n && n <height)
	const coordToButton = coord => $(xyToId(coord[0],coord[1]))
	const horizAdj = [x-1,x+1].filter(inTheXFrame).map(e=>[e,y])
	const verticAdj = [y-1,y+1].filter(inTheYFrame).map(e=>[x,e])
	return [...horizAdj, ...verticAdj].map( coordToButton )
}

function exchange(button, empty) {
	empty.innerHTML = button.innerHTML
	button.innerHTML = ''
}

function randomChoose(array) {
	const index = Math.floor(Math.random()*array.length)
	return array[index]
}

function isOrdered(buttonList) {
	const isAtRightPlace = button=>(button.innerHTML=='' || button.innerHTML==(1*button.id+1))
	return Array.from(buttonList).every(isAtRightPlace)
}`,`#---------------
# Prepare game
#---------------
# 'import' imports from JavaScript code
var buttonList := import('buttonList')
var emptyButton := import('emptyButton')

#---------------
# Shuffle cards
#---------------
repeat 100:
	var adj := calljs getAdjacentButtons(emptyButton)
	var button := calljs randomChoose(adj)
	waitSeconds(0)
	calljs exchange(button, emptyButton)
	emptyButton := button

#---------------
# Play
#---------------
while not (calljs isOrdered(buttonList)):
	var adj := listToPar(calljs getAdjacentButtons(emptyButton))
	parallel(for button in adj, select 1):
		select:
			awaitClickBeep(button)
		do:
			calljs exchange(button, emptyButton)
			emptyButton := button

#----------
# Success
#----------
displayNewMessage('Congratulations! You succeeded!')`
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
	chooseGame: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,`button {
	margin: 10px;
	&.clicked {
		color: green;
		font-weight: bold;
	}
}
.gameSpace {
	background-color: #444;
	padding: 3px;
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	gap: 1em;
	& > div {
		background-color: #888;
	}
}
#gameTableIntern {
	display: flex;
	flex-flow: row wrap;
	button {
		padding: 10px;
		margin: 10px;
	}
}`,`function makeButtons(howMany) {
	return '<button disabled> </button>'.repeat(howMany)
}

function randomNumbers(max) {
	return [0,0,0,0,0].map( e=>Math.floor( (max)*Math.random()+1 ) )
}`,`var choiceSpace
var gameSpace

def newGameSpace():
	#addCssClassTo('gameSpace', gameSpace)
	gameSpace := displayNewElementIn('', 'body/gameSpace', 'div', true)

def guessNumber(p_min, p_max):
	var gameTable := displayNewElementIn('', gameSpace, 'div', true)
	addCssClassTo('guessNumber', gameTable)
	
	var numberToGuess := randomIntBetween(p_min, p_max)
	var triedNumber := 'notTried'
	displayNewMessageIn('Guess my number (between ' + p_min + ' and ' + p_max + ')!', gameTable)

	while triedNumber != numberToGuess:
		
		triedNumber := awaitNewHumanTextIn('.gameSpace:last-of-type > div.guessNumber')
		
		if triedNumber < numberToGuess:
			displayNewMessageIn('Too low! Try again!', gameTable)
		if triedNumber > numberToGuess:
			displayNewMessageIn('Too high! Try again!', gameTable)

	displayNewMessageIn('Well Done!', gameTable)
	'Guess the Number'

def findButtons(p_numberOfButtons):
	var gameTable := displayNewElementIn('', gameSpace, 'div', true)
	addCssClassTo('findButtons', gameTable)
	
	displayNewMessageIn('Find the buttons!', gameTable)
	displayNewHtmlIn('<div id="gameTableIntern"></div>', gameTable)
	displayNewHtmlIn(calljs makeButtons(p_numberOfButtons), '#gameTableIntern')

	var buttonNum := listToPar(calljs randomNumbers(p_numberOfButtons))
	parallel forEachValueOf buttonNum:
		awaitClickBeep('#gameTableIntern > button:nth-of-type(' + buttonNum + ')')
	displayNewMessageIn('You found them!', gameTable)
	'Find the buttons'

def askForChoice(p_question):
	displayNewMessage(p_question)
	choiceSpace := displayNewMessageIn('', 'body/self')

def waitForChoice(p_message):
	awaitClickBeep(displayNewElementIn(p_message, choiceSpace, 'button', true))

askForChoice('Hello! What do you want to play?')
parallel(select 1) ||
||=========================================================
	waitForChoice('"Guess the Number" (between 1 and 100)')
...---
	newGameSpace()
	guessNumber(1, 100)
	displayNewMessage('See you later!')
||========================================
	waitForChoice('"Find the buttons"')
...---
	newGameSpace()
	findButtons(100)
	displayNewMessage('See you later!')
||========================================
	waitForChoice('Both the games')
...---
	askForChoice('Oh! Ok, but how?')
	parallel(select 1) ||
	||===================
		waitForChoice('One at a time')
	...---
		askForChoice('But which first?')
		parallel(select 1) ||
		||==============
			waitForChoice('Guess the Number')
		...---
			newGameSpace()
			guessNumber(1, 10)
			findButtons(100)
		||==============
			waitForChoice('Find the Buttons')
		...---
			newGameSpace()
			findButtons(100)
			guessNumber(1, 10)
		displayNewMessage('I hope you had a good time!')
	||====================
		waitForChoice('At the same time and until I finished both')
	...---
		newGameSpace()
		parallel:
			guessNumber(1, 10)
			findButtons(100)
		displayNewMessage('I hope you had a good time!')
	||====================
		waitForChoice('At the same time and until I finished just one')
	...---
		newGameSpace()
		var game := parallel exitAfter 1 finished:
			guessNumber(1, 10)
			findButtons(100)
		displayNewMessage("Congratulations! You've succeeded in one game: '" + game + "'!")
	||=====================
		waitForChoice('At the same time and forever!')
	...---
		newGameSpace()
		parallel:
			while true:
				guessNumber(1, 10)
				waitSeconds(2)
				removeElt('.gameSpace:last-of-type > div.guessNumber')
			while true:
				findButtons(100)
				waitSeconds(2)
				removeElt('.gameSpace:last-of-type > div.findButtons')
`
	],
	//=============================
	counter: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<span id="count">0</span>
		<button id="increment">Count</button>
	</body>
</html>`,``,``,`while true:
	awaitClickBeep('#increment')
	displayMessageIn(   1*getText('#count') + 1,   '#count'   )`
	],
	//=============================
	counterReact: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<span id="count">0</span>
		<button id="increment">Count</button>
	</body>
</html>`,``,``,`parallel:
	var count := 0
	while true:
		awaitClickBeep('#increment')
		count += 1
	while true:
		awaitBeep count
		displayMessageIn(count, '#count')`
	],
	//=============================
	counterPlusMinus: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<button id="decrement">Decrement</button>
		<span id="count">0</span>
		<button id="increment">Increment</button>
	</body>
</html>`,``,``,`parallel:
	var count := 0
	while true:
		awaitClickBeep('#decrement')
		count -= 1
	while true:
		awaitClickBeep('#increment')
		count += 1
	while true:
		awaitBeep count
		displayMessageIn(count, '#count')`
	],
	//=============================
	temperatureConverterSimple: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<input type="text" id="celsius">
		<span id="count">Celsius = </span>
		<input type="text" id="fahrenheit">
		<span id="count">Fahrenheit</span>
	</body>
</html>`,``,``,`def round(p_number):
	js (p_number):
		return Number.parseFloat(p_number).toFixed(2)

var celsiusInput := getElement('#celsius')
var fahrenheitInput := getElement('#fahrenheit')

parallel:
	while true:
		awaitDomeventBeep('input', celsiusInput)
		fahrenheitInput.value := round(celsiusInput.value*9/5 + 32)
	while true:
		awaitDomeventBeep('input', fahrenheitInput)
		celsiusInput.value := round((fahrenheitInput.value-32)*5/9)`
	],
	//=============================
	temperatureConverter: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
		<input type="text" id="celsius">
		<span id="count">Celsius = </span>
		<input type="text" id="fahrenheit">
		<span id="count">Fahrenheit</span>
	</body>
</html>`,`body.notSync input {
	background-color: gray;
}

input.invalid.invalid {
	background-color: red;
}`,``,`def isInputValid(p_element):
	js (p_element):
		return !isNaN(p_element.value)

def round(p_number, p_precision):
	js (p_number, p_precision):
		return Number.parseFloat(p_number).toFixed(p_precision)

var celsiusInput := getElement('#celsius')
var fahrenheitInput := getElement('#fahrenheit')

var temperatureSynchronization

parallel:
	while true:
		awaitDomeventBeep('input', celsiusInput)
		temperatureSynchronization := isInputValid(celsiusInput)
		if temperatureSynchronization:
			fahrenheitInput.value := round(celsiusInput.value*9/5 + 32, 2)
		else:
			addCssClassTo('invalid', celsiusInput)
	while true:
		awaitDomeventBeep('input', fahrenheitInput)
		temperatureSynchronization := isInputValid(fahrenheitInput)
		if temperatureSynchronization:
			celsiusInput.value := round((fahrenheitInput.value-32)*5/9, 2)
		else:
			addCssClassTo('invalid', fahrenheitInput)
	while true:
		awaitBeep temperatureSynchronization
		if temperatureSynchronization:
			DelCssClassFrom('notSync', 'body')
			DelCssClassFrom('invalid', celsiusInput)
			DelCssClassFrom('invalid', fahrenheitInput)
		else:
			addCssClassTo('notSync', 'body')`
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
