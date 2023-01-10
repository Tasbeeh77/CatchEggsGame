//selectors
const container = document.querySelector("div")
const basket = document.querySelector(".basket")
const scoreObject = document.querySelector("h1[name=score]")
const timeObject = document.querySelector("h1[name=time]")
const divWidth = 1292
const divHeight = 650
const eggSize = 120
const basketSize = 150
let BasketCurrentPosition = 0
let score = 0
let time = 60


//createEgg from random place
const createEgg = () => {
    let fallingEgg = document.createElement("img")
    fallingEgg.src = "images/egg.png"
    fallingEgg.classList.add("egg")
    let left = Math.floor(Math.random() * (divWidth - eggSize))
    fallingEgg.style.left = left + 'px'
    container.append(fallingEgg)
    fallDown(fallingEgg, 0, left)
}

//moving the basket
const moveBasket = function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (BasketCurrentPosition > 0) {
                BasketCurrentPosition -= 40;
                basket.style.left = BasketCurrentPosition + 'px'
            }
            break;
        case 'ArrowRight':
            if (BasketCurrentPosition < (divWidth - basketSize)) {
                BasketCurrentPosition += 40;
                basket.style.left = BasketCurrentPosition + 'px'
            }
            break;
    }
}


let countDown = () => {
    let id = setInterval(() => {
        if (time > 0) {
            timeObject.innerHTML = `Time: ${--time}`
        }
        else {
            timeObject.innerHTML = `GAME OVER!`
            timeObject.classList.add("color")
            clearInterval(id)
            document.removeEventListener("keydown", moveBasket)
            if(prompt("Do you want to play again?\nENTER y")=='y')
            {
                location.reload()
            }
        }

    }, 1000);
}

//make the egg falling
const fallDown = (fallingEgg, top, left) => {
    let basketTop = basket.style.top.replace("px", "");
    let timerId = setInterval(() => {
        if (time > 0) {
            let basketLeft = basket.style.left.replace("px", "");
            if (top < (divHeight - eggSize)) {
                top += 10
                fallingEgg.style.top = top + 'px'
            }
            else if (left < (parseInt(basketLeft) + basketSize) &&
                left > basketLeft &&
                (top + eggSize) >= basketTop
            ) {
                container.removeChild(fallingEgg)
                clearInterval(timerId)
                scoreObject.innerHTML = `Your score is: ${++score}`
                createEgg()

            }
            else {

                fallingEgg.src = "images/fallingegg.png"
                setTimeout(() => {
                    container.removeChild(fallingEgg)
                }, 500);
                clearInterval(timerId)
                createEgg()
            }
        }
        else {
            clearInterval(timerId)
        }
    }, 50);
}

window.addEventListener("load", function () {
    createEgg()
    countDown()
    document.addEventListener("keydown", moveBasket)
})
