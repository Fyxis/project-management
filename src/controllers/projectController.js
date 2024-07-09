const sharp = require('sharp')
const projectService = require('../services/projectService')
const formatDate = require('../utils/formatDate')
const variables = require('../utils/variables')

const getAllProject = async (req, res) => {
    try {
        const [data] = await projectService.getAllProject()
        formatDate(data)
        
        for(let i = 0; i < data.length; i++) {
            const [name] = await projectService.selectUserByCreatedBy(data[i].created_by)

            let photoUrl = `${variables.dirPhoto}/project/projectDefault.png`
            if(data[i].photo != "projectDefault.png") {
                photoUrl = `${variables.dirPhoto}/project/converter/${data[i].photo}`
            }

            data[i].photo = photoUrl
            data[i].created_by = name[0]
        }

        return res.status(200).json({
            status: 200,
            message: `SUCCESSFULLY GET ALL PROJECTS`,
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

const getProjectByIdProject = async (req, res)  => {
    const { id_project } = req.params
    try {
        const [data] = await projectService.getProjectByIdProject(id_project)
        formatDate(data)

        let photoUrl = `${variables.dirPhoto}/project/projectDefault.png`
        if(data[0].photo != "projectDefault.png") {
            photoUrl = `${variables.dirPhoto}/project/converter/${data[0].photo}`
        }

        const [name] = await projectService.selectUserByCreatedBy(data[0].created_by)

        data[0].photo = photoUrl
        data[0].created_by = name[0]
        
        return res.status(200).json({
            status: 200,
            message: `SUCCESSFULLY GET PROJECT ID ${id_project}`,
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

const createProjectByIdUser = async (req, res) => {
    const { id_user } = req.params
    const { project_name, description_project, start_date, end_date } = req.body
    const [files] = req.files
    try {
        //! CHECKING PRROJECT NAME
        const [checkingProjectName] = await projectService.selectProjectByProjectName(project_name)
        if(checkingProjectName.length != 0) {
            return res.status(400).json({
                status: 400,
                message: 'PROJECT NAME ALREADY TAKEN'
            })
        }
        
        let photoName = `projectDefault.png`
        let replaced
        if(files) {
            const filePhoto = files.filename
            replaced = filePhoto.replace(/\.[^.]+$/, '')
            await sharp(`public/photo/project/original/${filePhoto}`).webp({ quality: 80 }).toFile(`public/photo/project/converter/${replaced}.webp`)
            photoName = `${replaced}.webp`
        }

        await projectService.createProjectByIdUser(project_name, description_project, photoName, start_date, end_date, id_user)
        
        const [data] = await projectService.selectLastProject()
        const [name] = await projectService.selectUserByCreatedBy(id_user)
        
        data[0].photo = `${variables.dirPhoto}/project/${photoName}`
        if(files) {
            data[0].photo = `${variables.dirPhoto}/project/converter/${replaced}.webp`
        }
        data[0].created_by = name[0]
        formatDate(data)
        
        return res.status(200).json({
            status: 200,
            message: `SUCCESS CREATE PROJECT`,
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

const getAllProjectByIdUser = async (req, res) => {
    const { id_user } = req.params
    try {
        const [data] = await projectService.getAllProjectByIdUser(id_user)
        formatDate(data)

        for(let i = 0; i < data.length; i++) {
            const [name] = await projectService.selectUserByCreatedBy(id_user)

            let photoUrl = `${variables.dirPhoto}/project/projectDefault.png`
            if(data[i].photo != 'projectDefault.png'){
                photoUrl = `${variables.dirPhoto}/project/converter/${data[i].photo}`
            }
            
            data[i].photo = photoUrl
            data[i].created_by = name[0]
        }
        
        return res.status(200).json({
            status: 200,
            message: `SUCCESS GET ALL PROJECT BY ID USER ${id_user}`,
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

module.exports = { 
    getAllProject, 
    getProjectByIdProject, 
    createProjectByIdUser,
    getAllProjectByIdUser
}