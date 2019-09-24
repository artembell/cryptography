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
    console.log(text, key)

    // let text = getNormalizedText(text)

    let mappedKey = getMappedKey(key)

    console.log(mappedKey)

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

    console.log(result)
    return result 
}

const decipher = ({text, key}) => {
    console.log(text, key)

    let result = new Array(key.length)
    let mappedKey = getMappedKey(key)

    text.split('').forEach((letter) => {
        
    });
    return text
}

const isKeyValid = (key) => {
    return true
}
export const columnar = {
    encipher,
    decipher,
    isKeyValid,
    keyRequirements: ['Your key must contain only letters']
}