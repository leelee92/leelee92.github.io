import events from "./events.js";

const canvas = document.querySelector("canvas");
const cnv = canvas.getContext("2d");

const scoring = document.getElementById("result");

// fonction constructeur (balles)
function Balls(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velY = 4;
  this.status = 0;
}

// création de la barre de jeu
var barre = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 50,
  width: 40,
  height: 10,
  velX: 10,
  count: 0,
  draw: function () {
    scoring.textContent = barre.count;
    cnv.beginPath();
    cnv.rect(this.x, this.y, this.width, this.height);
    cnv.fillStyle = "indianred";
    cnv.fill();
    cnv.closePath();
  },
};

// fonction prototype (balles) : dessiner
Balls.prototype.draw = function () {
  cnv.beginPath();
  cnv.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  cnv.fillStyle = this.color;
  cnv.fill();
  cnv.closePath();
};

// fonction prototype (balles) : calcul nouvelle coordonnée (axe Y)
Balls.prototype.update = function () {
  this.y += this.velY;
};

// fonction prototype (balles) : reinitialise la position, la couleur et le statut (collision / pas de collision)
Balls.prototype.up = function () {
  this.y = startY;
  this.color = colorsBalls[Math.round(Math.random() * 1)];
  this.status = 0;
};

// fonction prototype (balles) : vérifie si les balles entrent en collision avec la barre de jeu
Balls.prototype.collision = function () {
  if (
    this.x >= barre.x &&
    this.x <= barre.x + barre.width &&
    this.y >= barre.y &&
    this.y <= barre.y + barre.height &&
    !this.status &&
    this.color === "green"
  ) {
    this.status = 1;
    barre.count++;
    this.color = "white";
  } else if (
    this.x >= barre.x &&
    this.x <= barre.x + barre.width &&
    this.y >= barre.y &&
    this.y <= barre.y + barre.height &&
    !this.status &&
    this.color === "red"
  ) {
    this.status = 1;
    barre.count--;
    this.color = "black";
  }
};

// definition variables pour l'initialisation du jeu
const vaultBalls = [];
const nombreBalls = 18;
const colorsBalls = ["red", "green"];
const startY = -10;

// fonction initialisation du jeu : fabrication et stockage des objets (balles)
function init() {
  scoring.textContent = barre.count;
  let initX = -20;
  for (let i = 0; i < nombreBalls; i++) {
    const x = (initX += barre.width);
    const y = startY;
    const radius = 10;
    const color = colorsBalls[Math.round(Math.random() * 1)];
    vaultBalls.push(new Balls(x, y, radius, color));
  }
}

// fonction animation du jeu : affichage et calcul des nouvelles positions des balles + affichage de la barre de jeu
function animate() {
  cnv.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < vaultBalls.length; i++) {
    // si la balle sort du bord infèrieur du canvas
    if (vaultBalls[i].y - vaultBalls[i].radius > canvas.height) {
      vaultBalls[i].up();
    } else {
      vaultBalls[i].draw();
      barre.draw();

      // verification si la balle entre en collision avec la barre de jeu
      vaultBalls[i].collision();

      // mise a jour des nouvelles coordonnées de la balle (axe Y)
      vaultBalls[i].update();
    }
  }
  // si le score n'est pas atteint
  if (barre.count < 10) {
    // auto-execution de la fonction animate
    window.requestAnimationFrame(animate);
  } else {
    cnv.clearRect(0, 0, canvas.width, canvas.height);
    window.location.assign("./cv.html");
  }
}

init();
animate();
alert(
  "Hey salut ! Tu veux accéder au curriculum vitae de Lee-Roy ? Pour cela attrappe les balles vertes et évite surtout les balles rouges en déplacant ta barre de jeu latéralement grace aux flèches de ton clavier, une fois le score atteint... à toi la victoire :)"
);
events(barre, canvas);
