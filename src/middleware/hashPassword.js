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

// Contoh penggunaan
// const passwordToHash = 'password123';
// hashPassword(passwordToHash)
//     .then(hashedPassword => {
//         console.log('Hashed password:', hashedPassword);
//     })
//     .catch(err => {
//         console.error('Error:', err);
//     });

module.exports = hashPassword