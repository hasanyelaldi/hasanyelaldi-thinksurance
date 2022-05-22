const User = require('../model/User');

/**
 * It is used to log out of the system, and if there is a refreshToken of the relevant user in the database, it will be deleted.
 * 
 * @param {json} req
 * @param {json} res
 * @return {json} service response
 */
const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204).json({ 'success': `Logged out!` });
}

module.exports = { handleLogout }