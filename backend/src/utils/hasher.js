const crypto = require('crypto');


const hasher = (string) => crypto.
    createHash(process.env.HASH || 'SHA256').
    update(string).
    digest('hex');


module.exports = hasher;