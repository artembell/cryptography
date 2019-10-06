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


const encipher = ({text, key}) => {
    let mappedKey = getMappedKey(key)


    let result = ''
    const len = mappedKey.length
    for(let i = 0; i < len; i++){
        let curIndex = mappedKey.indexOf(i)
        while(text[curIndex]){
            result += text[curIndex]
            curIndex += len
        }
    }

    return result 
}

const decipher = ({text, key}) => {

    let result = new Array(text.length)
    let mappedKey = getMappedKey(key)
    let curIndex = 0

    const integer = Math.floor(text.length / key.length),
        residue = text.length % key.length,
        res = text.length / key.length


    for(let i = 0; i < key.length; i++){
        let index = mappedKey.indexOf(i)
        let amount = index < residue ? Math.ceil(res) : Math.floor(res)

        let offset = 0
        for(let j = 0; j < amount; j++){
            result[index + offset] = text[curIndex]
            offset += key.length
            curIndex++
        }
    }
    return result.join('')
}

const formKey = (key) => {
    return key.toLowerCase().split('').reduce((res, letter, index) => {
        return alphabet.includes(letter) ? res + letter : res
    }, '')
}

export const columnar = {
    encipher,
    decipher,
    formKey,
    keyRequirements: [[`Your key should consist only of letters: ${alphabet}`]],
    alphabet
}