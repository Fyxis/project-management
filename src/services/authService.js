const authModel = require('../models/authModel')

const login = (email, password) => {
    return authModel.login(email, password)
}

const checkEmail = (email) => {
    return authModel.checkEmail(email)
}

const checkUsername = (username) => {
    return authModel.checkUsername(username)
}

const checkPassword = (email) => {
    return authModel.checkPassword(email)
}

const register = (firstName, lastName, username, email, password, dateOfBirth) => {
    return authModel.register(firstName, lastName, username, email, password, dateOfBirth)
}

const selectLastRegister = () => {
    return authModel.selectLastRegister()
}

module.exports = {
    login,
    checkEmail,
    checkUsername,
    checkPassword,
    register,
    selectLastRegister
}