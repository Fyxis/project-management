const connection = require('../config/dbConnection')
const { table_task, table_user, table_project } = require('../utils/variables')

let SQL

const getAllTask = () => {
    SQL = `SELECT * FROM ${table_task}`
    return connection.execute(SQL)
}

const getTaskByIdProject = (id_project) => {
    SQL = `SELECT * FROM ${table_task} WHERE project = ?`
    return connection.execute(SQL, [id_project])
}

const getTaskByIdUser = (id_user) => {
    SQL = `SELECT * FROM ${table_task} WHERE created_by = ?`
    return connection.execute(SQL, [id_user])
}

const createTaskByIdUser = (title, description, status, project, id_user, start_date, end_date) => {
    SQL = `INSERT INTO ${table_task} (title, description, status, project, created_by, start_date, end_date) VALUE (?, ?, ?, ?, ?, ?, ?)`
    return connection.execute(SQL, [title, description, status, project, id_user, start_date, end_date])
}

const selectLastTask = () => {
    SQL = `SELECT * FROM ${table_task} ORDER BY id_task DESC LIMIT 1`
    return connection.execute(SQL)
}

const selectUserByCreatedBy = (id_user) => {
    SQL = `SELECT name, email, role, phone, photo FROM ${table_user} WHERE id_user = ?`
    return connection.execute(SQL, [id_user])
}

const selectProjectByProject = (project) => {
    SQL = `SELECT project_name, start_date, end_date FROM ${table_project} WHERE id_project = ?`
    return connection.execute(SQL, [project])
}

const selectTaskByTitle = (title) => {
    SQL = `SELECT title FROM ${table_task} WHERE status IN ('Pending', 'Done') AND title = ?`
    return connection.execute(SQL, [title])
}

module.exports = { 
    getAllTask,
    getTaskByIdProject,
    getTaskByIdUser,
    createTaskByIdUser,
    selectLastTask,
    selectUserByCreatedBy,
    selectProjectByProject,
    selectTaskByTitle,
}