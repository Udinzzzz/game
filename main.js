import { Player } from "./player.js"
import { InputHandler } from "./input.js"
import { Backround } from "./backround.js"
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js"
import { UI } from "./UI.js"

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')

    canvas.width = canvas.offsetWidth
    canvas.height = 500

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.speed = 0
            this.maxSpeed = 6
            this.groundMargin = 80
            this.backround = new Backround(this)
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.UI = new UI(this)
            this.enemies = []
            this.particles = []
            this.collisions = []
            this.floatingMessages = []
            this.lives = 5
            this.maxParticles = 50
            this.enemyTimer = 0
            this.enemyInterval = 1000
            this.debug = false
            this.score = 0
            this.winningScore = localStorage.getItem('winningScore') || 10
            this.fontColor = 'black'
            this.time = 0
            this.gameOver = false
            this.gamePaused = false
            this.player.currentStates = this.player.states[0]
            this.player.currentStates.enter()
        }

        update(deltaTime) {
            this.time = this.time || 0
            this.time += deltaTime
            this.backround.update()
            this.player.update(this.input.keys, deltaTime)
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy()
                this.enemyTimer = 0
            } else {
                this.enemyTimer = this.enemyTimer || 0
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime)
                if (enemy.markedFordeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
            })

            this.particles.forEach((particle) => {
                particle.update()
                if (particle.markedForDeletion) this.particles.splice(this.enemies.indexOf(particle, 1))
            })

            this.floatingMessages.forEach(message => {
                message.update()
            })

            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles

            }

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime)
                if (collision.markedForDeletion) this.collisions.splice(index, 1)
            })

            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion)

        }

        draw(context) {
            this.backround.draw(context)
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
            this.particles.forEach(particle => {
                particle.draw(context)
            })
            this.collisions.forEach(collision => {
                collision.draw(context)
            })
            this.floatingMessages.forEach(message => {
                message.draw(context)
            })
            this.UI.draw(context)
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this))
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
            this.enemies.push(new FlyingEnemy(this))

        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (!game.gamePaused && !game.gameOver) {
            game.update(deltaTime)
        }
        game.draw(ctx)
        requestAnimationFrame(animate);
    }

    animate(0)
})

alert('selamat datang di game anjing!, silahkan klik ikon berbentuk buku untuk tutorial')

