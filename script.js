var perso = document.querySelector(".perso");
var obstaclesEl = document.querySelector(".obstacles");
let score = 0;
const scoreDiv = document.getElementById("score");
let obstacleCounted = false;
let gameOver = false;

const sonVole  = new Audio("sons/sonVole.mp3");
const sonScore = new Audio("sons/sonScore.mp3");
const sonChoc  = new Audio("sons/sonChoc.mp3");

sonVole.preload  = "auto";
sonScore.preload = "auto";
sonChoc.preload  = "auto";

function playSound(audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

function sauter() {
    if (gameOver) return;
    if (!perso.classList.contains("animation")) {
        perso.classList.add("animation");
        playSound(sonVole);
        setTimeout(() => {
            perso.classList.remove("animation");
        }, 500);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        sauter();
    }
});

document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    sauter();
}, { passive: false });

var verification = setInterval(function () {
    if (gameOver) return;

    var jeu = document.querySelector(".jeu");
    var persoRect = perso.getBoundingClientRect();
    var obsRect   = obstaclesEl.getBoundingClientRect();
    var jeuRect   = jeu.getBoundingClientRect();

    var obsLeft = obsRect.left - jeuRect.left;

    var overlapX = obsRect.left < persoRect.right - 2 && obsRect.right > persoRect.left + 2;
    var overlapY = obsRect.top  < persoRect.bottom - 2;

    if (overlapX && overlapY) {
        obstaclesEl.style.animation = "none";
        gameOver = true;
        playSound(sonChoc);
        clearInterval(verification);
        setTimeout(() => {
            alert("Vous avez perdu \n\nSCORE : " + score);
        }, 200);
        return;
    }

    if (obsLeft + obsRect.width < 0 && !obstacleCounted) {
        updateScore();
        playSound(sonScore);
        obstacleCounted = true;
    }
    if (obsLeft > 0) {
        obstacleCounted = false;
    }
}, 20);

function updateScore() {
    score++;
    scoreDiv.textContent = score;
}

/*By IrouKaizen & Godwin-creator*/