/* let c = document.getElementById("game__canvas");
let ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 50, 50);
*/
/* cosas para hacer en el juego 

- hacer el boton de para iniciar el juego 
- hacer el conometro del juego ✅
- ponerle musica al juego 
- ponerle efectos de sonido al juego 
- hacer el boton para hacer que el juego ocupe la pantalla completa 
- hacer los botones de atras y adelante de la proxima pregunta 
- hacer una serie de opciones para eleguir 
- validar que la pregunta sea correcta o incorrecta segun eliga el usuario 
- crear cada opcion 
- contador de todas las preguntas correctas que llevemos 
- crear un menu 
- hacer una tabla del puntaje que saco el usuario 
- hacer el boton de mostrar las respuesta y mostrarlas 
- hacer el boton de clasificacion y mostrar las clasificaciones   
- hacer el cover ✅
*/

// Tareas del dia de hoy 04-10-24
// 1.- Crear el contador ✅
// 2.- la opcion de pantalla grande

// Tareas del dia de hoy 05-10-24
// 1.- hacer el cover
// 2.- poner todos los iconos

// let gameCanvas = document.getElementById("game__canvas");
// ctx.fillStyle = "green";
// ctx.fillRect(10, 10, 100, 100);

/* const stream = gameCanvas.captureStream(25); // 25 FPS

// Do things to the stream
// E.g. Send it to another computer using an RTCPeerConnection
//      pc is an RTCPeerConnection created elsewhere
stream.getTracks().forEach((track) => console.log(track));

gameCanvas.onmut
*/
/* const imageData = ctx.createImageData(100, 100);
console.log(imageData);
// Fill the array with RGBA values
for (let i = 0; i < imageData.data.length; i += 4) {
	// Percentage in the x direction, times 255
	let x = ((i % 400) / 400) * 255;
	// Percentage in the y direction, times 255
	let y = (Math.ceil(i / 400) / 100) * 255;

	// Modify pixel data
	imageData.data[i + 0] = x; // R value
	imageData.data[i + 1] = y; // G value
	imageData.data[i + 2] = 255 - x; // B value
	imageData.data[i + 3] = 255; // A value
    }
    
    // Draw image data to the canvas
ctx.putImageData(imageData, 20, 20);
 */

import timer from "./js/timer.js";

let $container = document.querySelector(".container__game__canvas");
let $btnAudioEnable = document.getElementById("btn_audio_enable");
let $btnAudioDisable = document.getElementById("btn_audio_disable");
let $btnPlay = document.getElementById("btn_play");

let $timer = document.querySelector(".timer");
let $cover = document.querySelector(".cover");
let $btnMenu = document.getElementById("btn_menu");
let $correctAnswer = document.querySelector(".correct__answer");
let $intformation = document.querySelector(".information");

let $audioContainer = document.querySelector(".container__audio__game");

let canvas = document.getElementById("game__canvas");
let ctx = canvas.getContext("2d");
// ctx.console.log(canvas);

$btnPlay.addEventListener("click", () => {
	$cover.style.display = "none";
	$timer.style.display = "block";
	$btnMenu.style.display = "block";
	$correctAnswer.style.display = "flex";
	$intformation.style.display = "flex";
	$audioContainer.play();
	setInterval(timer, 1000);
});

$btnAudioEnable.addEventListener("click", () => {
	$btnAudioEnable.style.display = "none";
	$btnAudioDisable.style.display = "block";
	$audioContainer.pause();
});

$btnAudioDisable.addEventListener("click", () => {
	$btnAudioDisable.style.display = "none";
	$btnAudioEnable.style.display = "block";
	$audioContainer.play();
});

const question = "x2 - 9";
const answers = ["(x-9)(x+9)", "(x-3)(x+3)", "(x+3)(x+3)"];
const correctAnswerIndex = 1; // Index of the correct answer

let selectedAnswerIndex = null;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.font = "30px Arial";
	ctx.fillText(question, 330, 100);

	// Draw answers
	answers.forEach((answer, index) => {
		ctx.fillStyle = index === selectedAnswerIndex ? "#ccc" : "white";
		ctx.fillRect(200, 250 + index * 40, 360, 30);
		ctx.fillStyle = "black";
		ctx.fillText(answer, 300, 275 + index * 40);
		if (answer === correctAnswerIndex) {
			ctx.fillStyle = "green";
		}
	});
}

// Function to handle mouse clicks
canvas.addEventListener("click", (event) => {
	const mouseX = event.clientX - canvas.getBoundingClientRect().left;
	const mouseY = event.clientY - canvas.getBoundingClientRect().top;

	// Determine which answer was clicked
	answers.forEach((_, index) => {
		if (mouseY > 250 + index * 40 && mouseY < 275 + index * 40) {
			selectedAnswerIndex = index;
			draw();
			validateAnswer(index);
		}
	});
});

// Function to validate the answer
function validateAnswer(selectedIndex) {
	if (selectedIndex === correctAnswerIndex) {
		ctx.fillText("Respuesta Correcta", 250, 420);

		clearInterval(timer);
		$cover.style.display = "flex";
		$timer.style.display = "none";
		$audioContainer.remove();
	} else {
		ctx.fillText("Respuesta Incorrecta", 250, 420);
	}
}

// Initial draw
draw();
// const answers = ["Berlin", "Madrid", "Paris", "Lisbon"];
