const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 12),
    compare: async (password, hashPassword) => {
        const isPasswordEqual = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEqual) {
            throw new Error('Wrong email or password');
        }
    }
};
