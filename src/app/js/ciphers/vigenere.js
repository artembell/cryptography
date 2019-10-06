const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'

const getMappedKey  = (text, key) => {
    let res = ''
    for(let i = 0; i < Math.floor(text.length / key.length); i++){
        res += key
    }
    res += key.slice(0, text.length % key.length)

    return res
}

const encipher = ({text, key}) => {

    let res = getMappedKey(text, key)
    let result = ''

    text.split('').forEach((letter, index) => {
        let letterIndex = alphabet.indexOf(letter)
        let keyLetterIndex = alphabet.indexOf(res[index])

        let target = (letterIndex + keyLetterIndex) % alphabet.length
        result += alphabet[target]

    });

    return result
}

const decipher = ({text, key}) => {

    let res = getMappedKey(text, key)

    let result = ''
    text.split('').forEach((letter, index) => {
        let letterIndex = alphabet.indexOf(letter)
        let keyLetterIndex = alphabet.indexOf(res[index])

        let target = (alphabet.length + letterIndex - keyLetterIndex) % alphabet.length
        result += alphabet[target]

    });

    return result
}

const formKey = (key) => {
    return key.toLowerCase().split('').reduce((res, letter, index) => {
        return alphabet.includes(letter) ? res + letter : res
    }, '')
}

export const vigenere = {
    encipher,
    decipher,
    formKey,
    keyRequirements: [`Your key should consist only of letters: ${alphabet}`],
    alphabet
}