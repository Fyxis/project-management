const jwt = require('jsonwebtoken')

const generateAccessToken = (id) => {
	return jwt.sign({ id }, process.env.API_KEY, { expiresIn: "7d" });
};

module.exports = generateAccessToken