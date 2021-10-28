const bcrypt = require('bcrypt');
const saltRounds = 10; 

async function hash(pass) {
    const salt = await bcrypt.genSalt(saltRounds);
    const encrypt =  await bcrypt.hash(pass, salt);
    return encrypt;
}

module.exports = {hash}