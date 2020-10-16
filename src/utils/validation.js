import { Validator } from 'class-validator';
import { differenceInYears } from 'date-fns';
import parse from 'date-fns/parse';
// EMPTY
export const isEmpty = (value) => value === null || value === undefined || value === '';
// EMAIL
export const isValidEmail = (mail) => {
    const validator = new Validator();
    return validator.isEmail(mail);
    // /^w+([.+-]?w+)*@w+([.-]?w+)*(.w{2,4})+$/.test(mail)
};
// COLLEGE NUMBER
export const isValidCollegeNumber = (collegeNumber) => /^d{3,10}$/.test(collegeNumber);
// DATE
export const isValidDate = (date) => /^([0-2][0-9]|(3)[0-1])-(((0)[0-9])|((1)[0-2]))-d{4}$/.test(date);
export const isValidNumber = (number) => /^d+(.d+)?$/.test(number);
// Documento de Identidad (DNI/NIF, NIE, Passport)
export const isValidDocumentID = (text, elemID) => {
    if (['NIF', 'NIE', 'DNI'].includes(elemID)) {
        const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
        const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        const nieRexp = /^[XYZ012][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        const str = text.toString().toUpperCase();
        if (elemID === 'NIF' && !nifRexp.test(str))
            return false;
        if (elemID === 'NIE' && !nieRexp.test(str))
            return false;
        const nie = str
            .replace(/^[X]/, '0')
            .replace(/^[Y]/, '1')
            .replace(/^[Z]/, '2');
        const letter = str.substr(-1);
        const charIndex = parseInt(nie.substr(0, 8)) % 23;
        if (validChars.charAt(charIndex) === letter)
            return true;
        return false;
    }
    if (elemID === 'PASP') {
        const pass_esp = /^[a-z]{3}[0-9]{6}[a-z]?$/i;
        const pass_world = /^[A-Za-z0-9]{9}$/i;
        return pass_esp.test(text) || pass_world.test(text);
    }
    if (elemID === 'NIFP') {
        return true;
    }
    else {
        return false;
    }
};
// PHONE (ES)
export const isValidPhone_ESP = (phone) => (phone ? /^d{9}$/.test(phone) : true);
// PHONE INTERNATIONAL
export const isValidPhone = (number) => {
    const validator = new Validator();
    return number ? validator.isPhoneNumber(number, 'ZZ') : true;
    // /^w+([.+-]?w+)*@w+([.-]?w+)*(.w{2,4})+$/.test(mail)
};
// CARD
export const isValidCard = (text) => {
    if (!text || text.length < 18)
        return false;
    const number = text.split(' ').join('');
    if (number.length < 15 || number.length > 16)
        return false;
    if (number.length === 15 && number.substr(0, 2) !== '34' && number.substr(0, 2) !== '37')
        return false;
    if (number.length === 16) {
        const firstDigits = parseInt(number.substr(0, 2), 10);
        if (number.substr(0, 1) !== '4' && (firstDigits < 51 || firstDigits > 55))
            return false;
    }
    return number.match(/[0-9]/);
};
// CIF
export const isValidCif = (text) => {
    if (!text || text.length !== 9)
        return false;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'N', 'P', 'Q', 'R', 'S', 'U', 'V', 'W'];
    const letter = text.substr(0, 1);
    const province = text.substr(1, 2);
    const control = text.substr(text.length - 1);
    if (letters.indexOf(letter) === -1)
        return false;
    if ((['P', 'Q', 'R', 'S', 'W'].indexOf(letter) !== -1 || province === '00') && !control.match(/[A-Z]/))
        return false;
    if (['A', 'B', 'E', 'H'].indexOf(letter) !== -1 && !control.match(/[0-9]/))
        return false;
    const central = text.substr(1, 7);
    if (Number.isNaN(parseInt(central, 10)))
        return false;
    let sum = 0;
    central.split('').forEach((value, index) => {
        if ((index + 1) % 2 === 0) {
            sum += parseInt(value, 10);
        }
        else {
            let doubleValue = parseInt(value, 10) * 2;
            if (doubleValue > 9)
                doubleValue -= 9;
            sum += doubleValue;
        }
    });
    const units = sum % 10;
    const digit = units === 0 ? 0 : 10 - units;
    const relation = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    if (control !== digit.toString() && control !== relation[digit])
        return false;
    return true;
};
// PASSWORD
export const isValidPassword = (text) => {
    const regex = /^(?=.*[A-Za-z])(?=.*d)(?=.*[=@$!%*#?&_.;-])[A-Za-zd=@$!%*#?&_.;-]{6,}$/;
    return text.length > 5; // regex.test(text)
};
export const hasNumber = (text) => {
    return /d/.test(text);
};
export const isNumeric = (text) => {
    return /^d+$/.test(text);
};
// rfc mexico
export const isRFC = (rfc) => /^([A-ZÑ&]{3,4}) ?(?:- ?)?(d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]d|3[01])) ?(?:- ?)?([A-Zd]{2})([Ad])$/.test(rfc);
