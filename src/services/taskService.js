const taskModel = require('../models/taskModel')

const getAllTask = () => {
    return taskModel.getAllTask()
}

const getTaskByIdProject = (id_project) => {
    return taskModel.getTaskByIdProject(id_project)
}

const getTaskByIdUser = (id_user) => {
    return taskModel.getTaskByIdUser(id_user)
}

const createTaskByIdUser = (title_task, desc_task, status_task, id_user, project_name, start_date, end_date) => {
    return taskModel.createTaskByIdUser(title_task, desc_task, status_task, project_name, id_user, start_date, end_date)
}

const selectLastTask = () => {
    return taskModel.selectLastTask()
}

const selectUserByCreatedBy = (id_user) => {
    return taskModel.selectUserByCreatedBy(id_user)
}

const selectProjectByProject = (id_project) => {
    return taskModel.selectProjectByProject(id_project)
}

const selectTaskByTitle = (title) => {
    return taskModel.selectTaskByTitle(title)
}

module.exports = { 
    getAllTask,
    getTaskByIdProject,
    getTaskByIdUser,
    createTaskByIdUser,
    selectLastTask,
    selectUserByCreatedBy,
    selectProjectByProject,
    selectTaskByTitle
}