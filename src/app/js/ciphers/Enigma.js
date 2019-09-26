import { Ciphers } from './index'

class Enigma {
    constructor() {
        this.currentCipherIndex = 0
    }

    normalize(text) {
        const allowed = Ciphers[this.currentCipherIndex].alphabet

        return text.toLowerCase().split('').map(letter => {
            return allowed.includes(letter) ? letter : ''
        }).join('').replace(/\s+/g, '')
    }

    /**
     * @param {number} newCipherIndex
     */
    set cipher(newCipherIndex) {
        console.log(newCipherIndex)
        this.currentCipherIndex = newCipherIndex
    }

    formkKey(text) {
        return text
    }

    encipher({text, key}) {
        console.log(this.normalize(text))
        return text 
    }

    decipher({text, key}) {
        return text
    }
}

export default new Enigma()