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
	//=============================
	parallel: ['text',
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
	</head>

	<body>
	</body>
</html>`,``,``,`parallel ||
	waitSeconds(5)
||
	waitSeconds(1)
displayNewMessage('Both branches are terminated')`
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
</html>`,``,``,`var result := parallel ||
	waitSeconds(5)
	'value #1'
||
	waitSeconds(1)
	'value #2'
displayNewMessage('Both branches are terminated')
displayNewMessage(result)`
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
</html>`,``,``,`parallel exitAfter 1 finished ||
	waitSeconds(5)
||
	waitSeconds(1)
displayNewMessage('A branch is terminated')`
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
</html>`,``,``,`parallel exitWith branch 2 ||
	waitSeconds(10)
||
	waitSeconds(5)
||
	waitSeconds(1)
||
	waitSeconds(20)
displayNewMessage('Branch #2 is terminated')`
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
</html>`,``,``,`var speedyCar := parallel(select 2) ||
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
displayNewMessage(speedyCar + ' is a speedy car')`
	],
}
