const connection = require("../config/dbConnection");
const { table_project, table_user } = require("../utils/variables");

let SQL;

const getAllProject = () => {
	SQL = `SELECT * FROM ${table_project}`;
	return connection.execute(SQL);
};

const getProjectByIdProject = (id_project) => {
	SQL = `SELECT * FROM ${table_project} WHERE id_project = ?`;
	return connection.execute(SQL, [id_project]);
};

const createProjectByIdUser = ( project_name, description_project, photo, start_date, end_date, created_by ) => {
	SQL = `INSERT INTO ${table_project} (project_name, description, photo, start_date, end_date, created_by) VALUES (?, ?, ?, ?, ?, ?)`;
	return connection.execute(SQL, [
		project_name,
		description_project,
		photo,
		start_date,
		end_date,
		created_by,
	]);
};

const selectLastProject = () => {
	SQL = `SELECT * FROM ${table_project} ORDER BY id_project DESC LIMIT 1`;
	return connection.execute(SQL);
};

const selectUserByCreatedBy = (id_user) => {
	SQL = `SELECT name, email, role, phone, photo FROM ${table_user} WHERE id_user = ?`;
	return connection.execute(SQL, [id_user]);
};

const getAllProjectByIdUser = (id_user) => {
	SQL = `SELECT * FROM ${table_project} WHERE created_by = ?`;
	return connection.execute(SQL, [id_user]);
};

const selectProjectByProjectName = (project_name) => {
	SQL = `SELECT project_name FROM ${table_project} WHERE project_name = ?`
	return connection.execute(SQL, [project_name])
}

module.exports = {
	getAllProject,
	getProjectByIdProject,
	createProjectByIdUser,
	selectLastProject,
	selectUserByCreatedBy,
	getAllProjectByIdUser,
	selectProjectByProjectName
};
