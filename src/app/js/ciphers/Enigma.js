import { Ciphers } from './index'

class Enigma {
    constructor() {
        this.currentCipherIndex = 0
    }

    normalizeText(text) {
        const allowed = Ciphers[this.currentCipherIndex].alphabet

        return text.toLowerCase().split('').map(letter => {
            return allowed.includes(letter) ? letter : ''
        }).join('').replace(/\s+/g, '')
    }

    get current() {
        return Ciphers[this.currentCipherIndex]
    }

    get currentIndex() {
        return this.currentCipherIndex
    }

    get alphabet() { 
        return Ciphers[this.currentCipherIndex].alphabet
    }

    /**
     * @param {number} newCipherIndex
     */
    set cipher(newCipherIndex) {
        this.currentCipherIndex = newCipherIndex
    }

    normalizeKey(key) {
        return Ciphers[this.currentCipherIndex].formKey(key)
    }

    encipher({text, key}) {
        const normalizedText = this.normalizeText(text),
            normalizedKey = this.normalizeKey(key)

        if (normalizedKey && normalizedText) {
            return Ciphers[this.currentCipherIndex].encipher({text: normalizedText, key: normalizedKey})
        }

        return null
    }

    decipher({text, key}) {
        const normalizedText = this.normalizeText(text),
            normalizedKey = this.normalizeKey(key)
    
        if (normalizedKey && normalizedText) {
            return Ciphers[this.currentCipherIndex].decipher({text: normalizedText, key: normalizedKey})
        }
        
        return null
    }
}

export default new Enigma()