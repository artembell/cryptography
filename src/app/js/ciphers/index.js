import {railway} from './railway';
import {columnar} from './columnar';
import {vigenere} from './vigenere';
import CipherNames from '../enums/CipherNames';

const normalize = (text, allowed) => {
    return text.toLowerCase().split('').map(letter => {
        return allowed.includes(letter) ? letter : ''
    }).join('').replace(/\s+/g, '')
}

export const Ciphers = [
    railway, columnar, vigenere, normalizeText
]
export const normalizeText = normalize; 