export class InputHandler {
    constructor(game) {
        this.keys = []
        this.game = game
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'Enter')
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            }
            else if (e.key === 's' && this.keys.indexOf(e.key) === -1) this.keys.push('ArrowDown')
            else if (e.key === 'w' && this.keys.indexOf(e.key) === -1) this.keys.push('ArrowUp')
            else if (e.key === 'd' && this.keys.indexOf(e.key) === -1) this.keys.push('ArrowRight')
            else if (e.key === 'a' && this.keys.indexOf(e.key) === -1) this.keys.push('ArrowLeft')
            else if (e.key === 'e') this.game.debug = !this.game.debug

            console.log(this.keys, "keyDown")
        })

        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'Enter'
            ) {
                this.keys.splice(e.key.indexOf(e.key), 1)
            }
            if (e.key === 's') this.keys.splice(e.key.indexOf('ArrowDown'), 1)
            if (e.key === 'w') this.keys.splice(e.key.indexOf('ArrowUp'), 1)
            if (e.key === 'd') this.keys.splice(e.key.indexOf('ArrowRight'), 1)
            if (e.key === 'a') this.keys.splice(e.key.indexOf('ArrowLeft'), 1)

            console.log(this.keys, "keyUP")
        })
    }
}