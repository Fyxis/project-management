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

const checkPhone = (phone) => {
    SQL = `SELECT phone FROM ${variables.table_user} WHERE phone = ?`
    return connection.execute(SQL, [phone])
}

const register = (name, email, role, phone, photo, password) => {
    SQL = `INSERT INTO ${variables.table_user} SET name = ?, email = ?, role = ?, phone = ?, photo = ?, password = ?`
    return connection.execute(SQL, [name, email, role, phone, photo, password])
}

const selectLastRegister = () => {
    SQL = `SELECT * FROM ${variables.table_user} ORDER BY id_user DESC LIMIT 1`
    return connection.execute(SQL)
}

const selectNameByName = (name) => {
    SQL = `SELECT name FROM ${variables.table_user} WHERE name = ?`
    return connection.execute(SQL, [name])
}

module.exports = {
    login,
    checkEmail,
    checkUsername,
    checkPassword,
    checkPhone,
    register,
    selectLastRegister,
    selectNameByName
}