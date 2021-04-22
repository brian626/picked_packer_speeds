const User = require('../models/user-model')

createUser = (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({
            success: false,
            error: 'You must login before creating a user',
        })
    } else if (!req.session.isSupervisor) {
        return res.status(403).json({
            success: false,
            error: 'Only supervisors can create users',
        })
    }

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

updateUser = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({
            success: false,
            error: 'You must login before updating a user',
        })
    } else if (!req.session.isSupervisor) {
        return res.status(403).json({
            success: false,
            error: 'Only supervisors can update users',
        })
    }

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.name = body.name
        user.email = body.email
        user.password = body.hashedPassword
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({
            success: false,
            error: 'You must login before deleting a user',
        })
    } else if (!req.session.isSupervisor) {
        return res.status(403).json({
            success: false,
            error: 'Only supervisors can delete users',
        })
    }

    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({
            success: false,
            error: 'You must login before getting a user',
        })
    } else if (!req.session.isSupervisor) {
        return res.status(403).json({
            success: false,
            error: 'Only supervisors can get users',
        })
    }

    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({
            success: false,
            error: 'You must login before getting users',
        })
    } else if (!req.session.isSupervisor) {
        return res.status(403).json({
            success: false,
            error: 'Only supervisors can get users',
        })
    }

    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
}
