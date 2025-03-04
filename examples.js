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
	drinkingCow: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`displayNewMessage("What does a cow drink?")

parallel exitAfter 1 finished ||
	var response := awaitHumanText()
	displayNewMessage(response + " ... Oh, I didn't know that!")
||
	waitSeconds(5)
	displayNewMessage("Water")`
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
