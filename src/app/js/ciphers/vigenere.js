const alphabet = 'абвгдеёжзиклмнопрстуфхцчшщъыьэюя'

const encipher = ({text, key}) => {
    console.log(text, key)

    let res = ''
    for(let i = 0; i < Math.floor(text.length / key.length); i++){
        res += key
    }

    res += key.slice(0, text.length % key.length)
    console.log(res)
    let result = ''

    text.split('').forEach((letter, index) => {
        let letterIndex = alphabet.indexOf(letter)
        let keyLetterIndex = alphabet.indexOf(res[index])

        let target = (letterIndex + keyLetterIndex) % alphabet.length
        result += alphabet[target]

        console.log(letterIndex, keyLetterIndex)
    });

    return result
}

const decipher = ({text, key}) => {
    console.log('vigenere decipher')
}

const isKeyValid = () => {
    return true
}

export const vigenere = {
    encipher,
    decipher,
    isKeyValid,
    keyRequirements: ['Your key must contain only letters (Vigenere)']
}