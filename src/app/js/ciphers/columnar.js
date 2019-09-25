const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const getMappedKey = (key) => {
    let splitedKey = key.split(''),
        index = 0

    alphabet.split('').forEach((letter) => {
        while(splitedKey.includes(letter)){
            const keyLetterIndex = splitedKey.indexOf(letter)
            splitedKey[keyLetterIndex] = index++
        }
    })

    return splitedKey
}

const getNormalizedText = (text) => {
    return text
}

const encipher = ({text, key}) => {
    // console.log(text, key)

    // let text = getNormalizedText(text)

    let mappedKey = getMappedKey(key)

    // console.log(mappedKey)

    let result = ''
    const len = mappedKey.length
    for(let i = 0; i < len; i++){
        // const start = mappedKey.indexOf(i)
        let curIndex = mappedKey.indexOf(i)
        // calc inserting letter in while
        while(text[curIndex]){
            result += text[curIndex]
            curIndex += len
        }
    }

    // console.log(result)
    return result 
}

const decipher = ({text, key}) => {
    console.log(text, key)

    let result = new Array(text.length)
    let mappedKey = getMappedKey(key)
    let curIndex = 0
    // console.log(result)

    const integer = Math.floor(text.length / key.length),
        residue = text.length % key.length,
        res = text.length / key.length

    // console.log(integer, residue, res)

    for(let i = 0; i < key.length; i++){
        let index = mappedKey.indexOf(i)
        let amount = index < residue ? Math.ceil(res) : Math.floor(res)
        // console.log(index, amount)

        let offset = 0
        for(let j = 0; j < amount; j++){
            result[index + offset] = text[curIndex]
            offset += key.length
            curIndex++
        }
    }
    // console.log(result)
    return result.join('')
}

const formKey = (key) => {
    return key.split('').reduce((res, letter, index) => {
        return alphabet.includes(letter) ? res + letter : res
    }, '')
}

export const columnar = {
    encipher,
    decipher,
    formKey,
    keyRequirements: ['Your key must contain only letters'],
    alphabet: 'abcdefghijklmnopqrstuvwxyz'
}