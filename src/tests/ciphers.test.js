import {Ciphers} from '../app/js/ciphers/index'

test('vigenere', () => {
    expect(Ciphers[2].encipher({text: 'криптография', key: 'ключ'})).toBe('хьжжэъбзкажц');
});