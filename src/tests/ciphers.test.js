import {Ciphers} from '../app/js/ciphers/index'

test('vigenere (encipher)', () => {
    expect(Ciphers[2].encipher({text: 'криптография', key: 'ключ'})).toBe('хьжжэъбзкажц')
});

test('railway (encipher) with correct key', () => {
    const railway = Ciphers[0]
    // expect(railway.encipher({text: 'cryptography', key: '1'})).toBe('cryptography')
    expect(railway.encipher({text: 'cryptography', key: '2'})).toBe('cytgahrporpy')
    expect(railway.encipher({text: 'cryptography', key: '3'})).toBe('ctarporpyygh')
    expect(railway.encipher({text: 'cryptography', key: '4'})).toBe('cgroryytahpp')
    expect(railway.encipher({text: 'cryptography', key: '11'})).toBe('cryptograpyh')
    expect(railway.encipher({text: 'cryptography', key: '12'})).toBe('cryptography')
    expect(railway.encipher({text: 'cryptography', key: '13'})).toBe('cryptography')
    expect(railway.encipher({text: 'cryptography', key: '14'})).toBe('cryptography')
})