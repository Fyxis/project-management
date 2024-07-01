const connection = require('../config/dbConnection')
const variables = require('../utils/variables')

let SQL

const login = (email, password) => {
    SQL = `SELECT * FROM ${variables.table_user} WHERE email = ? AND password = ?`
    return connection.execute(SQL, [email, password])
}

const checkEmail = (email) => {
    SQL = `SELECT * FROM ${variables.table_user} WHERE email = ?`
    return connection.execute(SQL, [email])
}

const checkUsername = (username) => {
    SQL = `SELECT username FROM ${variables.table_user} WHERE username = ?`
    return connection.execute(SQL, [username])
}

const checkPassword = (email) => {
    SQL = `SELECT password FROM ${variables.table_user} WHERE email = ?`
    return connection.execute(SQL, [email])
}

const register = (firstName, lastName, username, email, password, dateOfBirth) => {
    SQL = `INSERT INTO ${variables.table_user} SET first_name = ?, last_name = ?, username = ?, email = ?, password = ?, date_of_birth = ?`
    return connection.execute(SQL, [firstName, lastName, username, email, password, dateOfBirth])
}

const selectLastRegister = () => {
    SQL = `SELECT * FROM ${variables.table_user} ORDER BY id_user DESC LIMIT 1`
    return connection.execute(SQL)
}

module.exports = {
    login,
    checkEmail,
    checkUsername,
    checkPassword,
    register,
    selectLastRegister
}