const moment = require('moment')
const taskService = require('../services/taskService')
const formatDate = require('../utils/formatDate')
const { dateFormat, dirPhoto } = require('../utils/variables')

const getAllTask = async (req, res) => {
    try {
        const [data] = await taskService.getAllTask()
        formatDate(data)
        for(let i = 0; i < data.length; i++) {
            const [project] = await taskService.selectProjectByProject(data[i].project)
            project.forEach((data) => {
                data.start_date = moment(data.start_date).format(dateFormat)
                data.end_date = moment(data.end_date).format(dateFormat)
            })
            const [name] = await taskService.selectUserByCreatedBy(data[i].created_by)
            name.forEach((data) => {
                if(data.photo != 'userDefault.png') {
                    data.photo = `${dirPhoto}/profile/converter/${data.photo}`
                } else {
                    data.photo = `${dirPhoto}/profile/userDefault.png`
                }
            })
            data[i].project = project[0]
            data[i].created_by = name[0]
        }
        return res.status(200).json({
            status: 200,
            message: `SUCCESS GET ALL TASK`,
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `SERVER ERROR`,
            messageServer: error
        })
    }
}

const getTaskByIdProject = async (req, res) => {
    const { id_project } = req.params
    try {
        const [data] = await taskService.getTaskByIdProject(id_project)
        const [project] = await taskService.selectProjectByProject(id_project)
        formatDate(data)
        for(let i = 0; i < data.length; i++) {
            project.forEach((data) => {
                data.start_date = moment(data.start_date).format(`${dateFormat}`)
                data.end_date = moment(data.end_date).format(`${dateFormat}`)
            })
            const [name] = await taskService.selectUserByCreatedBy(data[i].created_by)
            name.forEach((data) => {
                if(data.photo != 'userDefault.png') {
                    data.photo = `${dirPhoto}/profile/converter/${data.photo}`
                } else {
                    data.photo = `${dirPhoto}/profile/userDefault.png`
                }
            })
            data[i].created_by = name[0]
            data[i].project = project[0]
        }

        return res.status(200).json({
            status: 200,
            message: `SUCCESS GET ALL TASK BY ID PROJECT ${id_project}`,
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `SERVER ERROR`,
            messageServer: error
        })
    }
}

const getTaskByIdUser = async (req, res) => {
    const  { id_user } = req.params
    try {
        const [data] = await taskService.getTaskByIdUser(id_user)
        const [name] = await taskService.selectUserByCreatedBy(id_user)
        formatDate(data)
        name.forEach((data) => {
            if(data.photo != 'userDefault.png') {
                data.photo = `${dirPhoto}/profile/converter/${data.photo}`
            } else {
                data.photo = `${dirPhoto}/profile/userDefault.png`
            }
        })
        for(let i = 0; i < data.length; i++) {
            const [project] = await taskService.selectProjectByProject(data[i].project)
            project.forEach((data) => {
                data.start_date = moment(data.start_date).format(`${dateFormat}`)
                data.end_date = moment(data.end_date).format(`${dateFormat}`)
            })
            data[i].created_by = name[0]
            data[i].project = project[0]
        }
        return res.status(200).json({
            status: 200,
            message: `SUCCESS GET ALL TASK BY ID USER ${id_user}`,
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `SERVER ERROR`,
            messageServer: error
        })
    }
}

const createTaskByIdUser = async (req, res) => {
    const { id_user } = req.params
    const { title, description, status = "Pending", project, start_date, end_date } = req.body
    try {
        //! CHECKING TITLE
        const [checkingTitle] = await taskService.selectTaskByTitle(title)
        if(checkingTitle.length != 0) {
            return res.status(400).json({
                status: 400,
                message: `TITLE ALREADY USED`,
            })
        }
        
        //! CHECKING STATUS
        if(status !== "Done" && status !== "Pending" && status !== "Cancel" ) {
            return res.status(400).json({
                status: 400,
                message: `STATUS MUST BE DONE, PENDING, OR CANCEL`
            })
        }

        //! CHECKING PROJECT
        const [checkingProject] = await taskService.selectProjectByProject(project)
        if(checkingProject.length == 0) {
            return res.status(400).json({
                status: 400,
                message: `PROJECT NOT FOUND`
            })
        }

        //! CHECKING START DATE
        const dateNow = moment().format('YYYY-MM-DD')
        if(start_date <= dateNow) {
            return res.status(400).json({
                status: 400,
                message: `START DATE MUST BE BEGIN FROM TODAY OR FUTURE DATE`
            })
        }
        
        await taskService.createTaskByIdUser(title, description, status, id_user, project, start_date, end_date)
        const [data] = await taskService.selectLastTask()
        const [name] = await taskService.selectUserByCreatedBy(id_user)
        
        formatDate(data)        
        data.forEach((data) => {
            data.created_by = name[0]
            data.project = checkingProject[0].project_name
        })

        if(name[0].photo != 'userDefault.png') {
            name[0].photo = `${dirPhoto}/profile/converter/${name[0].photo}`
        } else {
            name[0].photo = `${dirPhoto}/profile/userDefault.png`
        }
        
        return res.status(200).json({
            status: 200,
            message: `SUCCESS CREATED TASK`,
            data: data[0]
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `SERVER ERROR`,
            messageServer: error
        })
    }
}

module.exports = {
    getAllTask,
    getTaskByIdProject,
    getTaskByIdUser,
    createTaskByIdUser,
}