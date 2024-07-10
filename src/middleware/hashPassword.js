const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try {
        // Generate salt dengan bcrypt
        const salt = await bcrypt.genSalt(10);

        // Hash password dengan salt yang dihasilkan
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

module.exports = hashPassword