import './style.css'
import blank from "./assets/images/blank.png"
import fries from "./assets/images/fries.png"
import cheeseburger from "./assets/images/cheeseburger.png"
import hotdog from "./assets/images/hotdog.png"
import iceCream from "./assets/images/ice-cream.png"
import milshake from "./assets/images/milkshake.png"
import pizza from "./assets/images/pizza.png"
import white from "./assets/images/white.png"

  const gridDisplay = document.querySelector('#grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
 const cardArray = [
    {
      name: 'fries',
      img: fries
    },
    {
      name: 'cheeseburger',
      img: cheeseburger
    },
    {
      name: 'ice-cream',
      img:iceCream
    },
    {
      name: 'pizza',
      img: pizza
    },
    {
      name: 'milkshake',
      img: milshake
    },
    {
      name: 'hotdog',
      img: hotdog
    },
    {
      name: 'fries',
      img: fries
    },
    {
      name: 'cheeseburger',
      img: cheeseburger
    },
    {
      name: 'ice-cream',
      img: iceCream
    },
    {
      name: 'pizza',
      img: pizza
    },
    {
      name: 'milkshake',
      img: milshake
    },
    {
      name: 'hotdog',
      img: hotdog
    }
  ]

cardArray.sort(() => 0.5 - Math.random())


function createBoard(){
    for (let i = 0; i < cardArray.length ; i++) {
        const card = document.createElement("img")
        card.setAttribute("src",blank)
        card.setAttribute("data-id",i)
        card.addEventListener("click",flipCard)
        gridDisplay.appendChild(card)
    }
}
createBoard()
function flipCard(){
    const  cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
    
}
function checkForMatch(){
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (optionOneId == optionTwoId){
      cards[optionOneId].setAttribute("src",blank)
      cards[optionTwoId].setAttribute("src",blank)
       alert('You have clicked the same image!')
    }else if (cardsChosen[0] === cardsChosen[1]){
      //alert('You found a match')
      cards[optionOneId].setAttribute('src', white)
      cards[optionTwoId].setAttribute('src', white)
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      
    }else{
      cards[optionOneId].setAttribute('src', blank)
      cards[optionTwoId].setAttribute('src', blank)
      //alert('Sorry, try again')
    }
  cardsChosen = []
  cardsChosenId = []
  resultDisplay.textContent = cardsWon.length
  if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
}