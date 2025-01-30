export class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Creepster'
        this.livesImage = document.getElementById('lives')
    }
    draw(context) {
        context.save()
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.textAlign = 'left'
        context.fillStyle = this.game.fontColor
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'white'
        context.shadowBlur = 0
        // score
        context.fillText('Score:' + this.game.score, 20, 50)
        //timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80)
        // live
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 30 * i + 25, 95, 25, 25)
        }
        //game over message
        if (this.game.gameOver) {
            context.textAlign = 'center'
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily
            if (this.game.score > this.game.winningScore) {
                context.fillText('New Score!!', this.game.width * 0.5, this.game.height * 0.5 - 20)
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
                context.fillText('You are really cool', this.game.width * 0.5, this.game.height * 0.5 + 20)
                localStorage.setItem('winningScore', this.game.score);
            } else {
                context.fillText('Game Over', this.game.width * 0.5, this.game.height * 0.5 - 20)
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
                context.fillText("you're stupid", this.game.width * 0.5, this.game.height * 0.5 + 20)

            }

        }

        if (this.game.gamePaused) {
            context.textAlign = 'center'
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily
            context.fillText('PAUSED', this.game.width*0.5, this.game.height*0.5)
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
            context.fillText("Press P to resume", this.game.width * 0.5, this.game.height * 0.5 + 20)

        }
        context.restore()
    }
}