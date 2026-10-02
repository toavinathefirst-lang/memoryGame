import './style.css'
import blank from "./assets/images/blank.png"
import fries from "./assets/images/fries.png"
import cheeseburger from "./assets/images/cheeseburger.png"
import hotdog from "./assets/images/hotdog.png"
import iceCream from "./assets/images/ice-cream.png"
import milshake from "./assets/images/milkshake.png"
import pizza from "./assets/images/pizza.png"

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')

// --- Timer (créé en JS, pas besoin de modifier ton HTML) ---
const timerDisplay = document.createElement('div')
timerDisplay.id = 'timer'
timerDisplay.textContent = '⏱ 00:00'
gridDisplay.before(timerDisplay)

let seconds = 0
let timerId = null

function formatTime(s) {
  const m = String(Math.floor(s / 60)).padStart(2, '0')
  const sec = String(s % 60).padStart(2, '0')
  return `${m}:${sec}`
}

function startTimer() {
  if (timerId) return // déjà lancé
  timerId = setInterval(() => {
    seconds++
    timerDisplay.textContent = `⏱ ${formatTime(seconds)}`
  }, 1000)
}

function stopTimer() {
  clearInterval(timerId)
  timerId = null
}

// --- Cartes ---
const items = [
  { name: 'fries', img: fries },
  { name: 'cheeseburger', img: cheeseburger },
  { name: 'ice-cream', img: iceCream },
  { name: 'pizza', img: pizza },
  { name: 'milkshake', img: milshake },
  { name: 'hotdog', img: hotdog },
]
const cardArray = [...items, ...items].sort(() => 0.5 - Math.random())

let cardsChosen = []
let cardsChosenId = []
let cardsWon = 0
let lockBoard = false // empêche de cliquer pendant la vérification

resultDisplay.textContent = `Paires : 0 / ${items.length}`

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('div')
    card.className = 'card'
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

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return

  startTimer()
  const cardId = this.dataset.id
  this.classList.add('flipped')
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenId.push(cardId)

  if (cardsChosen.length === 2) {
    lockBoard = true
    setTimeout(checkForMatch, 700) // laisse le temps de voir la 2e carte
  }
}

function resetTurn() {
  cardsChosen = []
  cardsChosenId = []
  lockBoard = false
}

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