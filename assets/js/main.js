class Game {
  constructor() {
    this.elements = {
      squares: document.querySelectorAll('.square'),
      timeLeft: document.querySelector('#time-left'),
      score: document.querySelector('#score'),
      lifeCounter: document.querySelector('#lifes'),
    };

    this.data = {
      hitPosition: 0,
      result: 0,
      currentTimer: 60,
      remainingLives: 3,
    };

    this.sounds = {
      hitSound: new Audio('./assets/sounds/hit.m4a'),
    };

    // Inicializa o jogo
    this.setupGame();
  }

  setupGame() {
    this.setupIntervals();
    this.addListenerHitBox();
  }

  setupIntervals() {
    setInterval(() => this.showRandomSquare(), 500);
    setInterval(() => this.countDown(), 1000);
  }

  showRandomSquare() {
    this.clearEnemySquares();

    const randomNumber = Math.floor(Math.random() * 9);
    const randomSquare = this.elements.squares[randomNumber];

    randomSquare.classList.add('enemy');

    this.data.hitPosition = randomSquare.id;
  }

  clearEnemySquares() {
    this.elements.squares.forEach((square) => square.classList.remove('enemy'));
  }

  countDown() {
    this.data.currentTimer--;

    this.elements.timeLeft.textContent = this.data.currentTimer;

    if (this.data.currentTimer === 0) {
      this.endGame();
    }
  }

  playSound(sound) {
    sound.currentTime = 0;
    sound.volume = 0.2;

    sound.play();
  }

  handleHit() {
    this.data.result++;

    this.playSound(this.sounds.hitSound);

    this.elements.score.textContent = this.data.result;
    this.data.hitPosition = null;
  }

  handleMiss() {
    this.data.remainingLives--;

    this.elements.lifeCounter.textContent = `x${this.data.remainingLives}`;

    if (this.data.remainingLives === 0) {
      this.endGame();
    }
  }

  endGame() {
    alert(`Game Over! Seu resultado foi ${this.data.result}`);

    window.location.reload(true);
  }

  addListenerHitBox() {
    this.elements.squares.forEach((square) => {
      square.addEventListener('mousedown', () => {
        square.id == this.data.hitPosition
          ? this.handleHit()
          : this.handleMiss();
      });
    });
  }
}

const game = new Game();
