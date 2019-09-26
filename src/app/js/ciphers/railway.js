const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const encipher = ({text, key: strKey}) => {
    const key = +strKey,
        start = (key - 1) * 2
    let result = '';

    if(key === 1 || text.length <= key.length){
        return text
    } else if (key === 0) {
        return null
    }

    for(let i = 0; i < key; i++){
        let j = i
        const firstOffset = (start === i * 2) ? start : (start - i * 2)
        let offset = firstOffset
        
        while(!!text[j]){
            result += text[j]
            j += offset
            offset = offset === start ? start : start - offset
        }
    }

    return result
}

const decipher = ({text, key: strKey}) => {
    const key = +strKey,
        start = (key - 1) * 2
    let result = new Array(text.length),
        index = 0

    if(key === 1 || text.length <= key.length){
        return text
    } else if (key === 0) {
        return null
    }

    for(let i = 0; i < key; i++){
        let j = i
        const firstOffset = (start === i * 2) ? start : (start - i * 2)
        let offset = firstOffset
        
        while(!!text[j]){
            result[j] = text[index]
            j += offset
            offset = offset === start ? start : start - offset
            index++
        }
    }

    return result.join('')
}

const formKey = (key) => {
    const matches = key.match(/\d+/) 
    return matches ? matches[0] : matches 
}


export const railway = {
    encipher,
    decipher,
    formKey,
    keyRequirements: [`Your key should consist only of letters: ${alphabet}`],
    alphabet
}