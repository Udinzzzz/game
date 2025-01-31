export class InputHandler {
    constructor(game) {
        this.keys = []
        this.game = game
        this.controlerV = true
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'Enter')
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            }
            else if (e.key === 's' && !this.keys.includes('ArrowDown')) this.keys.push('ArrowDown')
            else if (e.key === 'w' && !this.keys.includes('ArrowUp')) this.keys.push('ArrowUp')
            else if (e.key === 'd' && !this.keys.includes('ArrowRight')) this.keys.push('ArrowRight')
            else if (e.key === 'a' && !this.keys.includes('ArrowLeft')) this.keys.push('ArrowLeft')
            else if (e.key === 'e') this.game.debug = !this.game.debug
            else if (e.key === 'p') this.game.gamePaused = !this.game.gamePaused
            else if (e.key === 'c') {
                this.controlerV = !this.controlerV
                if (!this.controlerV) {
                    document.getElementById('controllerID').style.display = 'none'
                } else {
                    document.getElementById('controllerID').style.display = 'flex'
                }
            }

        })

        window.addEventListener('keyup', e => {
            if (e.key === 's') this.keys.splice(e.key.indexOf('ArrowDown'), 1)
            if (e.key === 'w') this.keys.splice(e.key.indexOf('ArrowUp'), 1)
            if (e.key === 'd') this.keys.splice(e.key.indexOf('ArrowRight'), 1)
            if (e.key === 'a') this.keys.splice(e.key.indexOf('ArrowLeft'), 1)
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'Enter'
            ) {
                this.keys.splice(e.key.indexOf(e.key), 1)
            }
        })

        document.querySelectorAll('.button').forEach(control => {
            control.addEventListener('touchstart', e => {
                if (this.keys.indexOf(e.target.id) === -1) {
                    this.keys.push(e.target.id)
                }
            })

            control.addEventListener('touchend', e => {
                this.keys.splice(e.target.id.indexOf(e.target.id), 1)
            })
        })

        document.querySelectorAll('.overlayButton').forEach( control => {
            control.addEventListener('click', e =>{
                if (e.target.id === 'c') {
                    this.controlerV = !this.controlerV
                    if (!this.controlerV) {
                        document.getElementById('controllerID').style.display = 'none'
                    } else {
                        document.getElementById('controllerID').style.display = 'flex'
                    }
                }else if (e.target.id === 'p') this.game.gamePaused = !this.game.gamePaused
            })
        })
    }
}