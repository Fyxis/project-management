const moment = require('moment')
const variables = require('./variables')

const checkingAge = (dateOfBirth) => {
    const now = moment()
    const nowYear = now.year()
    const dateInput = moment(dateOfBirth, variables.dateFormat)
    const yearOfBirth = dateInput.year()
    const minusAge = nowYear - yearOfBirth
    const age = parseInt(minusAge)
    if(age < 18) {
        return false
    }
    return true
}

module.exports = checkingAge