import './style.css'
import blank from "./assets/images/blank.png"
import fries from "./assets/images/fries.png"
import cheeseburger from "./assets/images/cheeseburger.png"
import hotdog from "./assets/images/hotdog.png"
import iceCream from "./assets/images/ice-cream.png"
import milshake from "./assets/images/milkshake.png"
import pizza from "./assets/images/pizza.png"
import white from "./assets/images/white.png"
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
console.log(cardArray);
cardArray.sort(()=>{
   0.5- Math.random()
})
console.log(cardArray);
const gridDisplay = document.getElementById("grid")

function createBoard(){
    
}