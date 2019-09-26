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

    /**
     * @param {number} newCipherIndex
     */
    set cipher(newCipherIndex) {
        console.log(newCipherIndex)
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

        console.log(normalizedText, normalizedKey)
        if (normalizedKey && normalizedText) {
            return Ciphers[this.currentCipherIndex].decipher({text: normalizedText, key: normalizedKey})
        }
        
        return null
    }
}

export default new Enigma()