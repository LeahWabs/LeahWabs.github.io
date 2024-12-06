const cards = document.querySelectorAll('.memory-card');
let compte=document.getElementById("nombre");
let number = parseInt(compte.textContent, 10);
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let phrase=document.getElementById("phrase");
let comptemove=0;
let end=document.getElementById("end");
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  
  secondCard = this;
  //la variable comptemove compte le nombre de movement que fait le joueur
 comptemove=comptemove+1;
 console.log(comptemove);
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}
let move=0;
function disableCards() {
  
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    //la variable move compte le nombre de fois le joueur trouve une paire
    move=move+1;
// quand move est eguale a 6 donc 12 cartes et que le nombre de chance n'est pas 0 un dialog s'affiche indiquant la victoire 
    if(move==6&&number>0){
      openagain();
      end.innerHTML="Bien joué tu as gagné :)"
    }
 
  
    resetBoard();
}

function unflipCards() {
  lockBoard = true;
  //diminue le nombre de chance de un a chaque fois que l'utilisateur retourne deux cartes differente
  number=number-1;
  compte.innerHTML=number;
  phrase.innerHTML="Nombre de chances \n manquante:";
  //quand le nombre de chance est fini un dialog s'affiche indiquant la fin du jeu 
  if(number==0){
   openagain();
   end.innerHTML="Tes chances sont finis :( Pas grave tu gagneras une prochaine fois :)"
 }

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


const modal=document.querySelector("#modal");
const dialog=document.querySelector('dialog')
const button=document.querySelector('.button');
const restart=document.getElementById("restart");
const fin=document.getElementById("no");
fin.addEventListener("click",findujeu);
const again=document.getElementById("yes");
again.addEventListener("click",playagain);
button.addEventListener("click",ferme);
open();
const afficher=document.querySelector('.afficher');
afficher.addEventListener("click",fermealways);
if(localStorage.getItem('modalCacher') !== 'false'){
  modal.showModal();
}else{
  modal.close();
}
//cette fonction ferme la boite de dialog quand le bouton fermer est appuyer 
function ferme(){
  modal.close();
}
//cette fonction ferme la boite de dialog et n'accepte plus la boite
function fermealways(){
  localStorage.setItem('modalCacher', 'false');
  modal.close();
  
  
}
// cette fonction permet l'ouverture de la boite de dialog avant l'appuie du bouton ne plus afficher
function open(){
  //localStorage.removeItem('modalCacher');
  dialog.showModal();
}
// cette fonction permet l'ouverture de la boite de dialog de la fin
function openagain(){
  restart.showModal();
}
//affiche le message apres le refus de faire une autre partie
function findujeu(){
  restart.innerHTML="MERCI D'AVOIR JOUÉ :)"
}
// recommence le jeu au debut quand le joueur veut rejouer
function playagain(){
  
  location.reload();
  
}

