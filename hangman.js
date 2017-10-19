var hang = {
	selectedWord: "",
	lettersInWord: [],
	dashes: 0,
	partialWord: [],
	wrongGuess: []
};

var counter = {
	wins: 0,
	losses: 0,
	guessLeft: 0
};

function playWord(word) {
	this.word = word;
	this.wordList = ["javascript","html","css","firebase","mysql"];
	this.selectedWord = "";
	this.lettersInWord = [];
	this.dashes = 0;
	// this.partialWord = [];
	this.wrongGuess = [];
	this.createWord = function() {
		this.selectedWord = this.wordList[Math.floor(Math.random()*this.wordList.length)];
		hang.selectedWord = this.selectedWord;
		this.lettersInWord = this.selectedWord.split("");
		hang.lettersInWord = this.lettersInWord;
		console.log('hang.lettersInWord: ', hang.lettersInWord);
		this.dashes = this.lettersInWord.length;
		hang.dashes = this.dashes;

		// Reset
		counter.guessLeft=9;
		hang.wrongGuess=[];
		this.wrongGuess=[];
		hang.partialWord=[];
		// this.partialWord=[];

		//Create right number of dashes
		for (var i=0; i<this.dashes; i++) {
			hang.partialWord.push("_");
			document.querySelector("#wordToGuess").innerHTML = hang.partialWord.join(" ");
			document.querySelector("#wrongGuess").innerHTML = "";
		}
		document.querySelector("#numGuesses").innerHTML = counter.guessLeft;


		console.log('selected word ', this.selectedWord);
		console.log('letters in word ', this.lettersInWord);
		console.log('dashes ', this.dashes);
		console.log('partialWord ', hang.partialWord);
	}

};


function playLetter(letter) {
	this.checkLetters = function(checkLetters) {
		this.isLetterInWord = false;
		console.log('playLetter.checkLetters() ran');
		for (var i=0; i<hang.dashes; i++) {
			console.log(`i is ${i} | hang.dashes is ${hang.dashes} | hang.lettersInWord ${hang.lettersInWord[i]} | checkLetters ${checkLetters}`);
			if(hang.lettersInWord[i] == checkLetters) {
				console.log(hang.lettersInWord[i] + " " + checkLetters);
				this.isLetterInWord = true;
			}
		}	
		//check where in word letter exits, then populate partialWord array
		console.log('isLetterInWord ', this.isLetterInWord);
		if(this.isLetterInWord){
			console.log('isLetterInWord true');
			for (var i=0; i<hang.dashes; i++) {
				if(hang.lettersInWord[i] == checkLetters) {
					hang.partialWord[i] = checkLetters;
					console.log(`correct letter ${checkLetters} | partialWord ${hang.partialWord}`);
				}
			}
		
		// letter wasn't found
		} else {
			hang.wrongGuess.push(checkLetters);
			counter.guessLeft--;
			console.log('letter not found');
		}

		console.log('partial word ', hang.partialWord);	
	}
};

function roundComplete() {
	console.log("Win Count: " + counter.wins + " | Loss Count: " + counter.losses + " | Guesses Left: " + counter.guessLeft);

	// update html to reflect most recent info
	document.querySelector("#numGuesses").innerHTML = counter.guessLeft;
	document.querySelector("#wordToGuess").innerHTML = hang.partialWord.join(" ");
	document.querySelector("#wrongGuess").innerHTML = hang.wrongGuess.join(" ");

	// check if user won
	console.log('hang.partialWord: ', + hang.partialWord + ' hang.lettersInWord: ' + hang.lettersInWord);
	if(hang.lettersInWord.toString() == hang.partialWord.toString()) {
		document.querySelector("#wordToGuess").innerHTML = hang.partialWord.join(" ");
		counter.wins++;
		alert("You Won!");

		// Update the win counter in HTML
		document.querySelector("#winCounter").innerHTML=counter.wins;
		newWord.createWord();
	}

	// if user losses
	else if (counter.guessLeft == 0) {
		counter.losses++;
		alert("You lost");

		// update html
		document.querySelector("#lossCounter").innerHTML = counter.losses;
		newWord.createWord();
	}

};



// ----------- EVENT LISTENERS -----------

document.onkeyup = function(event) {
	console.log('key clicked');
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	newLetter.checkLetters(letterGuessed);
	roundComplete();

	console.log('letterGuessed ', letterGuessed);
}

// ----------- START GAME -----------
var newWord = new playWord();
var newLetter = new playLetter();
console.log('game started');

newWord.createWord();

