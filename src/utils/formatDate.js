const moment = require('moment')
const { dateFormat, clockFormat } = require('./variables')

const formattingDate = (data) => {
    return data.forEach((data) => {
        data.date_of_birth = moment(data.date_of_birth).format(`${dateFormat}`)
        data.created_at = moment(data.created_at).format(`${dateFormat} ${clockFormat}`)
        data.updated_at = moment(data.updated_at).format(`${dateFormat} ${clockFormat}`)
    })
}
module.exports = formattingDate