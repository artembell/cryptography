import {Ciphers} from '../app/js/ciphers/index'

test('vigenere (encipher)', () => {
    expect(Ciphers[2].encipher({text: 'криптография', key: 'ключ'})).toBe('хьжжэъбзкажц')
});

test('railway (encipher) with correct key', () => {
    const railway = Ciphers[0]
    expect(railway.encipher({text: 'cryptography', key: '1'})).toBe('cryptography')
    expect(railway.encipher({text: 'cryptography', key: '2'})).toBe('cytgahrporpy')
    expect(railway.encipher({text: 'cryptography', key: '3'})).toBe('ctarporpyygh')
    expect(railway.encipher({text: 'cryptography', key: '4'})).toBe('cgroryytahpp')
    // ...
    expect(railway.encipher({text: 'cryptography', key: '11'})).toBe('cryptograpyh')
    expect(railway.encipher({text: 'cryptography', key: '12'})).toBe('cryptography')
    expect(railway.encipher({text: 'cryptography', key: '13'})).toBe('cryptography')
    expect(railway.encipher({text: 'cryptography', key: '14'})).toBe('cryptography')
})

// test('columnar (encipher) with correct key', () => {
//     const railway = Ciphers[1]
//     expect(railway.encipher({text: 'cryptography', key: '1'})).toBe('cryptography')
// })

test('vigenere (encipher) with correct key', () => {
    const cipher = Ciphers[2]
    expect(cipher.encipher({text: 'криптография', key: 'ключ'})).toBe('хьжжэъбзкажц')
    expect(cipher.encipher({text: 'криптография', key: 'ключик'})).toBe('хьжжыщньюлсй')
    // expect(cipher.encipher({text: 'криптография', key: 'ключ'})).toBe('ctarporpyygh')
    // expect(cipher.encipher({text: 'криптография', key: 'ключ'})).toBe('cgroryytahpp')
    // // ...
    // expect(cipher.encipher({text: 'криптография', key: 'ключ'})).toBe('cryptograpyh')
    // expect(cipher.encipher({text: 'криптография', key: 'ключ'})).toBe('cryptography')
    // expect(cipher.encipher({text: 'криптография', key: 'ключ'})).toBe('cryptography')
    // expect(cipher.encipher({text: 'криптография', key: 'ключ'})).toBe('cryptography')
})