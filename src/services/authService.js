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

const checkPhone = (phone) => {
    return authModel.checkPhone(phone)
}

const register = (name, email, role, phone, photo, password) => {
    return authModel.register(name, email, role, phone, photo, password)
}

const selectLastRegister = () => {
    return authModel.selectLastRegister()
}

const selectNameByName = (name) => {
    console.log(99)
    return authModel.selectNameByName(name)
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