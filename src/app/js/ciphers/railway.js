const encipher = ({text, key}) => {
    console.log(text, key);
    const start = (key - 1) * 2
    let result = '';

    for(let i = 0; i < key; i++){
        let j = i
        const firstOffset = (start === i * 2) ? start : (start - i * 2)
        let offset = firstOffset
        
        console.log('---', i);
        while(!!text[j]){
            console.log(j);
            result += text[j]
            j += offset
            offset = offset === start ? start : start - offset
        }
    }

    console.log(result)
    return result
}

const decipher = ({text, key}) => {
    console.log('railway decipher')
}

const isKeyValid = (key) => {
    return true
}


export const railway = {
    encipher,
    decipher,
    isKeyValid,
    keyRequirements: ['Your key must be number from 1 to 10', 'Nice', 'Key']
}