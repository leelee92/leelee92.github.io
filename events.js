export default function (barre, canvas) {
  const button1 = document.getElementById("button1");
  const button2 = document.getElementById("button2");

  // si appui sur les flèches droite et gauche alors on déplace la barre de jeu
  window.addEventListener("keydown", function (event) {
    switch (event.code) {
      case "ArrowLeft": {
        // si la barre de jeu dépasse le coté gauche du canvas
        if (barre.x - barre.velX > 0) {
          barre.x -= barre.velX;
        } else {
          barre.x = 0;
        }
        break;
      }
      case "ArrowRight": {
        // si la barre de jeu dépasse le coté droit du canvas
        if (barre.x + barre.width + barre.velX < canvas.width) {
          barre.x += barre.velX;
        } else {
          barre.x = canvas.width - barre.width;
        }
        break;
      }
    }
  });

  // si clic sur le bouton 1 alors on affiche la page du CV
  button1.addEventListener("click", function (event) {
    window.location.assign("./cv.html");
  });

  // si clic sur le bouton 2 alors on permet le téléchargement du CV
  button2.addEventListener("click", function (event) {
    window.location.assign("./cv.pdf");
  });
}
