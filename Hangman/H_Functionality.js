const cells = document.querySelectorAll(".cell");
const keyButtons = document.querySelectorAll(".keyButton");
const input = document.querySelector("#inputBox");
const victoryText = document.querySelector("#statusText");
const image = document.querySelector("#hang");

const jsConfetti = new JSConfetti();

var epochDays = Math.round(Date.now()/(1000*60*60*24))
var something = "453480540482398420"

let gameEnded = false;
let won = false;
sessionStorage.setItem("game", gameEnded)
sessionStorage.setItem("game", won)
let Lives = 6;

console.log(sessionStorage.gameEnded)
console.log(sessionStorage.won)

const HangsSprite = [
	"Images/Hanging_1.png",
	"Images/Hanging_2.png",
	"Images/Hanging_3.png",
	"Images/Hanging_4.png",
	"Images/Hanging_5.png",
	"Images/Hanging_6.png",
];

//#region Words

const Words = [
	"DOG",
	"LOG",
	"ICE",
	"AIR",
	"APP",
	"BEE",
	"HAM",
	"JAM",
	"LIE",
	"TREE",
	"ARES",
	"CUTE",
	"JAZZ",
	"QUIZ",
	"LAZY",
	"FAIL",
	"ROCK",
	"POWER",
	"QUICK",
	"CRAZY",
	"ACTOR",
	"PIZZA",
	"JOKER",
	"HOBBY",
	"PIGGY",
	"PUZZLE",
	"PIZZAS",
	"GAZEBO",
	"CIRCUS",
	"OXYGEN",
	"HACKED",
	"EXCUSE",
	"SPOOKY",
	"HANGMAN",
	"JUKEBOX",
	"ALCHEMY",
	"BIZARRE",
	"PEACOCK",
	"EXPLORE",
	"PACIFIC",
	"PHYSICS",
	"JETPACK",
	"EXCHANGE",
	"MEMORIZE",
	"SKIDIVER",
	"HOMEWORK",
	"LIFEHACK",
	"CHECKOUT",
	"QUANTICS",
	"ANTIQUES",
	"BIRTHDAY",
	"EXERCISE",
	"PIZZERIA",
	"BLACKJACK",
	"PAPARAZZI",
	"EXQUISITE",
	"JELLYFISH",
	"SHIPWRECK",
	"WORKBENCH",
	"COLORIZED"
];

//#endregion

let roundToWords = Words.length/999

let epochDstring = (Math.round(Math.pow(epochDays,2)*Math.PI)).toString()
let daysRandom = (epochDstring.slice(-3))

let word = Words[Math.round(daysRandom*roundToWords)];

//word="SHUTUP";
const char = word.split("");

startGame();

function startGame()
{
	if(sessionStorage.gameEnded == 'true')
	{
		if(sessionStorage.won == 'true')
			Victory()
		else
			Lost()
	}

	for(let i = 0; i < cells.length; i++){
		if(i >= char.length){
			cells[i].remove();
		}
	}

	input.maxLength = char.length;

	switch(char.length)
	{
		case 3:
			input.style.textIndent = "280px";
			break;
		case 4:
			input.style.textIndent = "250px";
			break;
		case 5:
			input.style.textIndent = "220px";
			break;
		case 6:
			input.style.textIndent = "190px";
			break;
		case 7:
			input.style.textIndent = "160px";
			break;
		case 8:
			input.style.textIndent = "130px";
			break;
		case 9:
			input.style.textIndent = "100px";
			break;
	}

	input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
		  InputCheck();
      }
    });
}

function buttonPressed(button, letter)
{
	if(sessionStorage.gameEnded){
		return;
	}

	let guessedRight = false;

	for(let i = 0; i < char.length; i++)
	{
		if(letter == char[i])
		{
			cells[i].textContent = letter;
			guessedRight = true;
		}
	}

	if(guessedRight){
		button.style.backgroundColor = "#09ff00";
	}
	else{
		button.style.backgroundColor = "red";
		Wrong();
		return;
	}

	let hasWon = true;

	for(let i = 0; i < char.length; i++){
		if(cells[i].textContent == ""){
			hasWon = false;
		}
	}

	if(hasWon){
		Victory();
	}
}

function InputCheck(){
	if(sessionStorage.gameEnded){
		return;
	}

	if(input.value == ""){
		return;
	}

	if(input.value.toUpperCase() == word){
		Victory();

		for(let i = 0; i < cells.length; i++)
		{
			cells[i].textContent = char[i];
			guessedRight = true;
		}
	}
	else{
		Lost();
		input.value = "";
	}
}

function Wrong(){
	Lives -= 1;

	image.src = HangsSprite[(6-Lives)-1];

	if(Lives <= 0)
	{
		Lost()
	}
}

function Lost()
{
	for(let i = 0; i < cells.length; i++)
	{
		cells[i].textContent = char[i];
	}
	sessionStorage.won = false
	sessionStorage.gameEnded = true;
	var audio = new Audio("Audio/lost.mp3")
	audio.play()
}

function  Victory(){
	jsConfetti.addConfetti();

	for(let i = 0; i < cells.length; i++)
	{
		cells[i].textContent = char[i];
	}
	sessionStorage.won = true
	var audio = new Audio("Audio/victory.mp3")
	audio.play()
	sessionStorage.gameEnded = true;
}