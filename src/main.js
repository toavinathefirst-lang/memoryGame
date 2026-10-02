import './style.css'
import blank from "./assets/images/blank.png"
import fries from "./assets/images/fries.png"
import cheeseburger from "./assets/images/cheeseburger.png"
import hotdog from "./assets/images/hotdog.png"
import iceCream from "./assets/images/ice-cream.png"
import milshake from "./assets/images/milkshake.png"
import pizza from "./assets/images/pizza.png"

/** @type {HTMLElement} */
const gridDisplay = document.querySelector('#grid')

/** @type {HTMLElement} */
const resultDisplay = document.querySelector('#result')

/** @type {HTMLDivElement} */
const timerDisplay = document.createElement('div')
timerDisplay.id = "timer"
timerDisplay.textContent = '⏱ 00:00'
gridDisplay.before(timerDisplay)

/** @type {number} */
let seconds = 0

/** @type {number|null} */
let timerId = null

/**
 * Formate un nombre de secondes sous forme d'une chaîne "mm:ss".
 * @param {number} s - Le nombre de secondes à formater.
 * @returns {string} Le temps formaté (ex: "01:30").
 */
function formatTime(s) {
  const m = String(Math.floor(s / 60)).padStart(2, '0')
  const sec = String(s % 60).padStart(2, '0')
  return `${m}:${sec}`
}

/**
 * Démarre l'intervalle du chronomètre si ce dernier n'est pas déjà lancé.
 * @returns {void}
 */
function startTimer() {
  if (timerId) return
  timerId = setInterval(() => {
    seconds++
    timerDisplay.textContent = `⏱ ${formatTime(seconds)}`
  }, 1000)
}

/**
 * Arrête le chronomètre et réinitialise son identifiant.
 * @returns {void}
 */
function stopTimer() {
  clearInterval(timerId)
  timerId = null
}

/** @type {string[]} */
let cardsChosen = []

/** @type {number[]} */
let cardsChosenId = []

/** @type {number} */
let cardsWon = 0

/** @type {boolean} */
let lockBoard = false

/**
 * Liste des éléments de jeu avec leur nom et l'URL de leur image.
 * @type {Array<{name: string, img: string}>}
 */
const items = [
  { name: 'fries', img: fries },
  { name: 'cheeseburger', img: cheeseburger },
  { name: 'ice-cream', img: iceCream },
  { name: 'pizza', img: pizza },
  { name: 'milkshake', img: milshake },
  { name: 'hotdog', img: hotdog },
]

/**
 * Tableau mélangé contenant deux exemplaires de chaque élément.
 * @type {Array<{name: string, img: string}>}
 */
const cardArray = [...items, ...items].sort(() => 0.5 - Math.random())

resultDisplay.textContent = `Paires : 0 / ${items.length}`

/**
 * Génère le plateau de jeu en créant les éléments HTML pour chaque carte.
 * @returns {void}
 */
function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("div")
    card.className = "card"
    card.dataset.id = i
    card.innerHTML = `
      <div class="card-inner">
        <img class="face back" src="${blank}" alt="" draggable="false">
        <img class="face front" src="${cardArray[i].img}" alt="${cardArray[i].name}" draggable="false">
      </div>`
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card)
  }
}

createBoard()

/**
 * Gestionnaire d'événement au clic sur une carte.
 * Retourne la carte sélectionnée et enclenche la vérification si deux cartes sont choisies.
 * @this {HTMLElement}
 * @returns {void}
 */
function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return
  startTimer()
  const cardId = Number(this.dataset.id)
  this.classList.add('flipped')
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenId.push(cardId)

  if (cardsChosen.length === 2) {
    lockBoard = true
    setTimeout(checkForMatch, 700)
  }
}

/**
 * Réinitialise l'état de la sélection courante et déverrouille le plateau.
 * @returns {void}
 */
function resetTurn() {
  cardsChosen = []
  cardsChosenId = []
  lockBoard = false
}

/**
 * Vérifie si les deux cartes retournées correspondent.
 * Met à jour le score ou retourne les cartes si la paire n'est pas correcte.
 * @returns {void}
 */
function checkForMatch() {
  const cards = gridDisplay.querySelectorAll('.card')
  const [one, two] = cardsChosenId.map(id => cards[id])

  if (cardsChosen[0] === cardsChosen[1]) {
    one.classList.add('matched')
    two.classList.add('matched')
    cardsWon++
    resultDisplay.textContent = `Paires : ${cardsWon} / ${items.length}`
    resetTurn()

    if (cardsWon === items.length) {
      stopTimer()
      resultDisplay.textContent = `🎉 Bravo ! Toutes les paires trouvées en ${formatTime(seconds)}`
    }
  } else {
    one.classList.add('wrong')
    two.classList.add('wrong')
    setTimeout(() => {
      one.classList.remove('flipped', 'wrong')
      two.classList.remove('flipped', 'wrong')
      resetTurn()
    }, 500)
  }
}