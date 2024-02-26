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
}
