const jwt = require('jsonwebtoken')
const sharp = require('sharp')

const authService = require("../services/authService");
const hashingPassword = require("../middleware/hashPassword");
const verifyPassword = require("../middleware/verifyPassword");
const sendMail = require('../middleware/mail')
const generateAccessToken = require('../middleware/generateAccessToken')

const checkingFirstLetter = require("../utils/checkingFirstLetter");
const checkingPassword = require("../utils/checkingPassword");
const formatDate = require('../utils/formatDate')

const urlPhoto = `${process.env.BASE_URL}/management/public/photo`

const loginAuth = async (req, res) => {
	const { email, password } = req.body;
	try {
		const [data] = await authService.checkEmail(email);
		if (!data || data.length == 0) {
			return res.status(400).json({
				status: 400,
				message: `EMAIL NOT FOUND`,
			});
		}
		const [passwordFromDatabase] = await authService.checkPassword(email);
		const isPasswordMatch = await verifyPassword(password, passwordFromDatabase[0].password);
		if (isPasswordMatch) {
			jwt.sign({ id: data[0].id_user }, process.env.API_KEY, { algorithm: 'HS256', expiresIn: '7d' }, (error, token) => {
				if(error) {
					return res.status(500).json({
						status: 500,
						message: 'JWT SIGN ERROR',
						messageServer: error
					})
				}
				formatDate(data)
				data.forEach((data) => {
					data.token = token
				})
				return res.status(200).json({
					status: 200,
					message: `LOGIN SUCCESFULLY`,
					data: data[0]
				});
			})
		} else {
			return res.status(400).json({
				status: 400,
				message: `PASSWORD DIDN'T MATCH`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: `SERVER ERROR`,
			messageServer: error,
		});
	}
};

const registerAuth = async (req, res) => {
	const { name, email, phone, password } = req.body;
	const [files] = req.files
	try {
		//! CHECKING NAME
		const [checkingName] = await authService.selectNameByName(name)
		if(checkingName.length != 0) {
			return res.status(400).json({
				status: 400,
				message: `NAME HAS BEEN ALREADY TAKEN`
			})
		}
		
		//! CHECKING FIRST LETTER MUST BE CAPITALIZED
		const checkName = checkingFirstLetter(name);
		if (!checkName) {
			return res.status(400).json({
				status: 400,
				message: "FIRST LETTER MUST BE CAPITALIZED",
			});
		}

		//! CHECKING EMAIL ALREADY TAKEN OR NOT
		const [checkEmail] = await authService.checkEmail(email);
		if (checkEmail.length !== 0) {
			return res.status(400).json({
				status: 400,
				message: "EMAIL ALREADY TAKEN",
			});
		}

		//! CHECKING PHONE NUMBER ALREADY TAKEN OR NOT
		const [checkPhone] = await authService.checkPhone(phone)
		if(checkPhone.length !== 0){ 
			return res.status(400).json({
				status: 400,
				message: "PHONE NUMBER ALREADY TAKEN"
			})
		}
		
		//! CHECKING PASSWORD MUST BE MINIMAL 8 CHARACTER AT LEAST ONE UPPERCASE LETTER, ONE LOWERCASE LETTER AND ONE NUMBER
		const checkPassword = checkingPassword(password);
		if (!checkPassword) {
			return res.status(400).json({
				status: 400,
				message: "PASSWORD MUST BE MINIMAL 8 CHARACTER AT LEAST ONE UPPERCASE LETTER, ONE LOWERCASE LETTER AND ONE NUMBER"
			});
		}
		
		let photoName = `userDefault.png`
		let replaced
		if(files) {
			const filePhoto = files.filename
			replaced = filePhoto.replace(/\.[^.]+$/, '')
            await sharp(`public/photo/profile/original/${filePhoto}`).webp({ quality: 80 }).toFile(`public/photo/profile/converter/${replaced}.webp`)
			photoName = `${replaced}.webp`
		}

        const hashPassword = await hashingPassword(password)
        await authService.register(name, email, "Member", phone, photoName, hashPassword)
		// sendMail(name, email)
		
		const [data] = await authService.selectLastRegister()
		formatDate(data)
		
		data[0].photo = `${urlPhoto}/profile/userDefault.png`
		if(files) {
			data[0].photo = `${urlPhoto}/profile/converter/${replaced}.webp`
		}
		
		return res.status(200).json({
			status: 200,
			message: `SUCCESSFULLY REGISTER`,
			data: data[0]
		})
	} catch (error) {
        return res.status(500).json({
            status: 500,
            message: `SERVER ERROR`,
            messageServer: error
        })
    }
};

const generateRefreshToken = (req, res) => {
	const newAccessToken = generateAccessToken(req.id)

	return res.status(200).json({
		access_token: newAccessToken
	})
}

module.exports = { loginAuth, registerAuth, generateRefreshToken };
