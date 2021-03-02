const router = require('express').Router();
const UserModel = require('../models/UserModel');
const hasher = require('../utils/hasher');
const jwt = require('jsonwebtoken');
const { userLoginValidator, userRegValidator } = require('../validators/UserValidator');

const json = { 'Content-Type': 'application/json' };

router.post('/register', async (req, res) => {
    const { value, error } = userRegValidator(req.body);

    if (error) return exitWithError(res, error, 400);

    let { email, password, course } = value;
    if (await getUserByEmail(email)) return exitWithError(res, 'This email is already in use.', 400);

    password = hasher(password);
    try {
        let user = new UserModel({ email, password, course, });
        res.header(json).status(201).send(await user.save());
    } catch (e) { return exitWithError(res, e, 400); }

});

router.post('/login', async (req, res) => {
    const { value, error } = userLoginValidator(req.body);

    if (error) return exitWithError(res, error, 400);

    const { email, password } = value;
    const user = await getUserByEmail(email);

    const isPasswordCorrect = hasher(password) === user.password;
    if (isPasswordCorrect) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.header({ ...json, 'auth_token': token }).send({ token });
    }
    if (!user || !isPasswordCorrect) return exitWithError(res, 'Either the email or the password is inccorret', 400);
});

async function getUserByEmail (email) {
    return await UserModel.findOne({ email });
}

function exitWithError (res, message, status = 400) {
    return res.status(status).header(json).send({ error: message });
}

module.exports = router;