const crypto = require('crypto');

const encryption = (password, salt)=> {
    const hash= crypto.createHash('sha256');
    const encryptedPassword= hash.update(password, salt).digest('hex');
    return encryptedPassword;
}

module.exports = {encryption}