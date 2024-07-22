const connection = require('../config/dbConnection');
const { table_user, table_project } = require('../utils/variables');

let SQL;

const verifyIdUser = (id_user) => {
    SQL = `SELECT * FROM ${table_user} WHERE id_user = ?`
    return connection.execute(SQL, [id_user])
}

const verifyIdProject = (id_project) => {
    SQL = `SELECT * FROM ${table_project} WHERE id_project = ?`
    return connection.execute(SQL, [id_project])
}

module.exports = { verifyIdUser, verifyIdProject }