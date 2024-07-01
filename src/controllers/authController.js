const authService = require("../services/authService");
const hashingPassword = require("../middleware/hashPassword");
const verifyPassword = require("../middleware/verifyPassword");
const sendMail = require('../middleware/mail')

const checkingFirstLetter = require("../utils/checkingFirstLetter");
const checkingPassword = require("../utils/checkingPassword");
const checkingAge = require("../utils/checkingAge");
const formatDate = require('../utils/formatDate')

const loginAuth = async (req, res) => {
	const { email, password } = req.body;
	try {
		const checkEmail = await authService.checkEmail(email);
		if (!checkEmail || checkEmail.length == 0) {
			return res.status(400).json({
				status: 400,
				message: `EMAIL NOT FOUND`,
			});
		}
		const passwordFromDatabase = await authService.checkPassword(email);
		const isPasswordMatch = await verifyPassword(password, passwordFromDatabase);
		if (isPasswordMatch) {
			return res.status(200).json({
				status: 200,
				message: `LOGIN SUCCESFULLY`,
			});
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
	const { firstName, lastName, username, email, password, dateOfBirth } = req.body;
	try {
		//! CHECKING FIRST LETTER MUST BE CAPITALIZED
		const checkFirstName = checkingFirstLetter(firstName);
		const checkLastName = checkingFirstLetter(lastName);
		if (!checkFirstName || !checkLastName) {
			return res.status(400).json({
				status: 400,
				message: "FIRST NAME OR LAST NAME MUST BE CAPITALIZED",
			});
		}

		//! CHECKING USERNAME ALREADY TAKEN OR NOT
		const checkUsername = await authService.checkUsername(username);
		if (!checkUsername || checkUsername == null || checkUsername.length == 0) {
			return res.status(400).json({
				status: 400,
				message: "USERNAME ALREADY TAKEN",
			});
		}

		//! CHECKING EMAIL ALREADY TAKEN OR NOT
		const checkEmail = await authService.checkEmail(email);
		if (!checkEmail || checkEmail == null || checkEmail.length == 0) {
			return res.status(400).json({
				status: 400,
				message: "EMAIL ALREADY TAKEN",
			});
		}

		//! CHECKING PASSWORD PASSWORD MUST BE MINIMAL 8 CHARACTER AT LEAST ONE UPPERCASE LETTER, ONE LOWERCASE LETTER AND ONE NUMBER
		const checkPassword = checkingPassword(password);
		if (!checkPassword) {
			return res.status(400).json({
				status: 400,
				message: "PASSWORD MUST BE MINIMAL 8 CHARACTER AT LEAST ONE UPPERCASE LETTER, ONE LOWERCASE LETTER AND ONE NUMBER"
			});
		}

		//! CHECKING AGE MUST BE 18 YEARS OLD
        const checkAge = checkingAge(dateOfBirth)
        if(!checkAge) {
            return res.status(400).json({
                status: 400,
                message: `AGE MUST BE 18 YEARS OLD`
            })
        }

        const hashPassword = await hashingPassword(password)
        await authService.register(firstName, lastName, username, email, hashPassword, dateOfBirth)
		sendMail(`${firstName} ${lastName}`, `${email}`)

		const [data] = await authService.selectLastRegister()
		formatDate(data)

        return res.status(200).json({
            status: 200,
            message: `SUCCESSFULLY REGISTER`,
            data: data
        })
	} catch (error) {
        return res.status(500).json({
            status: 500,
            message: `SERVER ERROR`,
            messageServer: error
        })
    }
};

module.exports = { loginAuth, registerAuth };
