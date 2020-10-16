export const PHONE_MX_FORMAT = {    
    numericOnly: true,
    blocks: [3, 3, 4]
}

export const DATE_FORMAT = {
    date: true,
    delimiter: '/',
    datePattern: ['Y', 'm', 'd']
}

export const NUMERAL_MONTH = {
    date: true,
    datePattern: ['m']
}

export const NUMERAL_YEAR = {
    date: true,
    datePattern: ['Y']
}

export const CVV = {
    numericOnly: true,
    blocks: [3]
}

export const CREDIT_CARD_FORMAT = {
    numericOnly: true, 
    blocks: [4,4,4,4]    
}

export const RFC_FORMAT = {
    blocks: [3, 6, 3]
}

export const POSTAL_CODE_FORMAT = {
    numericOnly: true,
    blocks: ['5']
}
