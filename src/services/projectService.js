const projectModel = require('../models/projectModel')

const getAllProject = () => {
    return projectModel.getAllProject()
}

const getProjectByIdProject = (id_project) => {
    return projectModel.getProjectByIdProject(id_project)
}

const createProjectByIdUser = (project_name, description_project, photo, start_date, end_date, created_by) => {
    return projectModel.createProjectByIdUser(project_name, description_project, photo, start_date, end_date, created_by)
}

const selectLastProject = () => {
    return projectModel.selectLastProject()
}

const selectUserByCreatedBy = (id_user) => {
    return projectModel.selectUserByCreatedBy(id_user)
}

const getAllProjectByIdUser = (id_user) => {
    return projectModel.getAllProjectByIdUser(id_user)
}

const selectProjectByProjectName = (project_name) => {
    return projectModel.selectProjectByProjectName(project_name)
}

module.exports = { 
    getAllProject, 
    getProjectByIdProject, 
    createProjectByIdUser, 
    selectLastProject, 
    selectUserByCreatedBy,
    getAllProjectByIdUser,
    selectProjectByProjectName
}