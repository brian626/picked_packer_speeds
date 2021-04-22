const Order = require('../models/order-model')
const User = require('../models/user-model')

getAnalyticsForUser = async (user) => {
    let userAnalytics = {}

    if (user) {
        // console.log(`looking for orders picked by ${user.email}`)

        const analytics =
            await Order.aggregate([ { $match: { picked_by: user.email } },
                                    { $group: {
                                        _id: { $week: "$pick_start_time" },
                                        averagePickTime: { $avg: { $subtract: ["$pick_end_time", "$pick_start_time"] } },
                                        averagePackTime: { $avg: { $subtract: ["$pack_end_time", "$pack_start_time"] } },
                                      }
                                    },
                                    { $sort: { _id: 1 } }
                                  ])

        userAnalytics[user.email] = analytics
    }

    // console.log(`returning user analytics`)
    // console.log(userAnalytics)
    return userAnalytics
}

getAnalytics = async (req, res) => {
    // console.log(`getAnalytics - req.session.username: ${req.session.username}`)
    // console.log(`getAnalytics - req.session.isSupervisor: ${req.session.isSupervisor}`)

    if (!req.session.loggedIn) {
        return res.status(401).json({
            success: false,
            error: 'You must login before getting analytics',
        })
    }

    let analytics = {}
    if (req.session.isSupervisor) {
        // Show all employee analytics
        const employees = await User.find({ email: { $ne: "supervisor" } })

        for (let index = 0; index < employees.length; index++) {
            const employee = employees[index];
            const userAnalytics = await getAnalyticsForUser(employee)

            if (!userAnalytics) {
                console.log(`Analytics not found for user ${user.email}`)
            }

            analytics = {
                ...analytics,
                ...userAnalytics
            }
        }
    } else {
        // Show single employee's analytics
        const user = await User.findOne({ email: req.session.username })

        const userAnalytics = await getAnalyticsForUser(user)

        if (!userAnalytics) {
            return res.status(404).json({ success: false, error: `Analytics not found for user ${user.email}` })
        }

        analytics = {
            ...analytics,
            ...userAnalytics
        }
    }

    // console.log(`getAnalytics returning`)
    // console.log(analytics)
    return res.status(200).json({ success: true, data: { "analytics": analytics } })
}

module.exports = {
    getAnalytics,
}
