const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelectorAll('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        lifeCounter: document.querySelector('#lifes'),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTimer: 60,
        lifeRemaining: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
    },
}

function countDown() {
    state.values.currentTimer--
    state.view.timeLeft.textContent = state.values.currentTimer

    if (state.values.currentTimer === 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert(`Gamer Over! O seu resultado foi ${state.values.result}`)
    }
}

function playSound(soundName) {
    const audio = new Audio(`./assets/sounds/${soundName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy')
    })

    const randomNumber = Math.floor(Math.random() * 9)
    const randomSquare = state.view.squares[randomNumber]

    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id == state.values.hitPosition) {
                state.values.result++
                playSound('hit')
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
            } else {
                state.values.lifeRemaining--
                state.view.lifeCounter.textContent = `x${state.values.lifeRemaining}`

                if (state.values.lifeRemaining === 0) {
                    alert(
                        `Gamer Over! O seu resultado foi ${state.values.result}`
                    )
                    window.location.reload(true)
                }
            }
        })
    })
}

;(function init() {
    addListenerHitBox()
})()
