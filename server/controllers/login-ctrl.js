const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

login = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide login credentials',
        })
    }

    await User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        const passwordMatches = bcrypt.compareSync(body.password, user.password)
        if (!passwordMatches) {
            return res
                .status(401)
                .json({ success: false, error: `Incorrect password` })
        }

        req.session.loggedIn = true
        req.session.username = body.email
        req.session.isSupervisor = (req.session.username === "supervisor")

        return res.status(200).json({ success: true, data: { "isSupervisor": req.session.isSupervisor } })
    }).catch(err => console.log(err))
}

module.exports = {
    login,
}
