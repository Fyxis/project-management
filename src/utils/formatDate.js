const moment = require('moment')
const { dateFormat, clockFormat } = require('./variables')

const formattingDate = (data) => {
    return data.forEach((data) => {
        data.created_at = moment(data.created_at).format(`${dateFormat} ${clockFormat}`)
        data.updated_at = moment(data.updated_at).format(`${dateFormat} ${clockFormat}`)
        if(data.start_date && data.end_date){
            data.start_date = moment(data.start_date).format(`${dateFormat}`)
            data.end_date = moment(data.end_date).format(`${dateFormat}`)
        }
    })
}
module.exports = formattingDate