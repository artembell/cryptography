import {Ciphers} from '../app/js/ciphers/index'

import Enigma from '../app/js/ciphers/Enigma'

// test('vigenere (encipher)', () => {
//     expect(Ciphers[2].encipher({text: 'криптография', key: 'ключ'})).toBe('хьжжэъбзкажц')
// });

test('railway (encipher)', () => {
    Enigma.cipher = 0

    expect(Enigma.encipher({text: 'cryptography', key: 'qwe1'})).toBe('cryptography')
    expect(Enigma.encipher({text: 'cryptography', key: '0'})).toBe(null)
    expect(Enigma.encipher({text: 'cryptography', key: '2'})).toBe('cytgahrporpy')
    expect(Enigma.encipher({text: '', key: '2'})).toBe(null)
    expect(Enigma.encipher({text: '123 0 ;;;фыв0_ @!', key: '2'})).toBe(null)
    expect(Enigma.encipher({text: '123 0 ;;;фыв0_ @!', key: '№ (№" --2'})).toBe(null)
    expect(Enigma.encipher({text: 'cryptography', key: 'qwe02'})).toBe('cytgahrporpy')
    expect(Enigma.encipher({text: 'cryptography', key: '-qwe-0/2-'})).toBe(null)
    expect(Enigma.encipher({text: 'cryptography', key: '-qwe-02-'})).toBe('cytgahrporpy')
    expect(Enigma.encipher({text: 'фывcrypt123 фыв _o .graphy', key: '-q-№"!. -we-02-'})).toBe('cytgahrporpy')
    expect(Enigma.encipher({text: 'cryptography', key: '3'})).toBe('ctarporpyygh')
    expect(Enigma.encipher({text: 'cryptography', key: '4'})).toBe('cgroryytahpp')
    expect(Enigma.encipher({text: 'cryptography', key: '11'})).toBe('cryptograpyh')
    expect(Enigma.encipher({text: 'cryptography', key: '12'})).toBe('cryptography')
    expect(Enigma.encipher({text: 'cryptography', key: '13'})).toBe('cryptography')
    expect(Enigma.encipher({text: 'cryptography', key: '14'})).toBe('cryptography')
})

test('railway (decipher)', () => {
    Enigma.cipher = 0

    expect(Enigma.decipher({text: 'cryptography', key: 'qwe0'})).toBe(null)
    expect(Enigma.decipher({text: 'cryptography', key: 'qwe1'})).toBe('cryptography')
    expect(Enigma.decipher({text: 'cryptography', key: 'qw0-фвыа1'})).toBe(null)
    expect(Enigma.decipher({text: 'cryptography', key: 'qw у_ ./0-фвыа1'})).toBe(null)
    expect(Enigma.decipher({text: '123_в фыуа(№;!--   3', key: 'qw4-фвыа1'})).toBe(null)
})



// test('columnar (encipher) with correct key', () => {
//     const railway = Ciphers[1]
//     expect(railway.encipher({text: 'cryptography', key: '1'})).toBe('cryptography')
// })

test('vigenere (encipher)', () => {
    Enigma.cipher = 2
    expect(Enigma.encipher({text: 'ёлкизелёныевлесу', key: 'ключик'})).toBe('рчиарпцслтнмцрпк')
    expect(Enigma.encipher({text: 'криптография', key: 'ключик'})).toBe('хьжжыщньюлсй')
    expect(Enigma.encipher({text: 'криптография', key: 'к123sdлючик'})).toBe('хьжжыщньюлсй')
    expect(Enigma.encipher({text: 'кри#% пт#ог рафasия', key: 'ключик'})).toBe('хьжжыщньюлсй')
    expect(Enigma.encipher({text: 'криптография', key: 'key 2@12'})).toBe(null)
    expect(Enigma.encipher({text: 'crypyo _D12', key: 'ключик'})).toBe(null)
    expect(Enigma.encipher({text: 'криптография', key: ''})).toBe(null)
    expect(Enigma.encipher({text: '', key: 'ключик'})).toBe(null)
    expect(Enigma.encipher({text: '', key: ''})).toBe(null)
})

test('vigenere (decipher)', () => {
    Enigma.cipher = 2
    expect(Enigma.decipher({text: 'рчиарпцслтнмцрпк', key: 'ключик'})).toBe('ёлкизелёныевлесу')
    expect(Enigma.decipher({text: 'рчиарпцслтнмцрпк', key: 'лолрофл'})).toBe('еиэпвыкёэжэюведь')
    expect(Enigma.decipher({text: 'рчиарпцслтнмцрпк', key: 'лол w_D №asd рофл'})).toBe('еиэпвыкёэжэюведь')
    expect(Enigma.decipher({text: 'рч  _SD -! иарпцслтнмцрпк', key: 'лолрофл'})).toBe('еиэпвыкёэжэюведь')
    expect(Enigma.decipher({text: 'рч -D qd 2_иарп 444 цслтнмцрпк', key: 'лолр# R$ офл'})).toBe('еиэпвыкёэжэюведь')
    expect(Enigma.decipher({text: 'рчиарпцслтнмцрпк', key: ''})).toBe(null)
    expect(Enigma.decipher({text: '', key: 'лолрофл'})).toBe(null)
    expect(Enigma.decipher({text: '', key: ''})).toBe(null)
})