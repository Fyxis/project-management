const bcrypt = require('bcryptjs')

const verifyPassword = async (enteredPassword, hashedPasswordFromDatabase) => {
    try {
        const match = await bcrypt.compare(enteredPassword, hashedPasswordFromDatabase);
        return match; // Return true if matching, false if didn't match
    } catch (error) {
        throw new Error('Error verifying password');
    }
};

module.exports = verifyPassword