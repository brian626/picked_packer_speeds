const Order = require('../models/order-model')
const User = require('../models/user-model')
const Faker = require('faker')

createOrder = (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ success: false, error: 'You must login before creating an order', })
    } else if (!req.session.isSupervisor) {
        return res.status(403).json({ success: false, error: 'Only supervisors can create orders', })
    }

    const body = req.body
    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide an order', })
    }

    const order = new Order(body)
    if (!order) {
        return res.status(400).json({ success: false, error: 'Order creation failed' })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({ success: true, id: order._id, message: 'Order created!', })
        })
        .catch(error => {
            return res.status(400).json({ error, message: 'Order not created!', })
        })
}

getOrders = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ success: false, error: 'You must login before getting orders', })
    }

    // Supervisors should be show all orders.
    // Employees should be shown unpicked orders as well as orders that have begun picking.
    let orders
    if (req.session.username === 'supervisor')
    {
        orders = await Order.find({})
    } else {
        orders = await Order.find({ $or: [{'picked_by': req.session.username}, {'picked_by': null}] })
    }

    if (!orders) {
        return res.status(400).json({ success: false, error: 'Error retrieving orders' })
    }

    // A lack of orders is not an error...
    //
    // if (!orders.length) {
    //     return res.status(200).json({ success: true, error: `No orders found` })
    // }

    return res.status(200).json({ success: true, data: orders })
}

startPick = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ success: false, error: 'You must login before starting an order pick', })
    }

    const body = req.body
    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide an order to update', })
    }

    const order = await Order.findOne({ _id: req.params.id })
    if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found!', })
    }

    order.picked_by = req.session.username
    order.pick_start_time = new Date()

    order
    .save()
    .then(() => {
        return res.status(200).json({ success: true, id: order._id, message: 'Order updated!', })
    })
    .catch(error => {
        return res.status(404).json({ error, message: 'Order not updated!', })
    })
}

stopPick = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ success: false, error: 'You must login before stopping an order pick', })
    }

    const body = req.body
    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide an order to update', })
    }

    const order = await Order.findOne({ _id: req.params.id })
    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found!', })
    }

    if (order.picked_by !== req.session.username) {
        return res.status(403).json({ err, message: 'Pick can only be stopped by the employee who started it!', })
    }

    order.pick_end_time = new Date()

    order
        .save()
        .then(() => {
            return res.status(200).json({ success: true, id: order._id, message: 'Order updated!', })
        })
        .catch(error => {
            return res.status(404).json({ error, message: 'Order not updated!', })
        })
}

startPack = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ success: false, error: 'You must login before starting an order pack', })
    }

    const body = req.body
    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide an order to update', })
    }

    const order = await Order.findOne({ _id: req.params.id })
    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found!', })
    }

    if (order.picked_by !== req.session.username) {
        return res.status(403).json({ success: false, message: 'Pack can only be started by the employee who picked the order!', })
    }

    order.pack_start_time = new Date()

    order
        .save()
        .then(() => {
            return res.status(200).json({ success: true, id: order._id, message: 'Order updated!', })
        })
        .catch(error => {
            return res.status(404).json({ error, message: 'Order not updated!', })
        })
}

stopPack = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ success: false, message: 'You must login before stopping an order pack', })
    }

    const body = req.body
    if (!body) {
        return res.status(400).json({ success: false, message: 'You must provide an order to update', })
    }

    const order = await Order.findOne({ _id: req.params.id })
    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found!', })
    }

    if (order.picked_by !== req.session.username) {
        return res.status(403).json({ success: false, message: 'Pack can only be stopped by the employee who picked the order!', })
    }

    order.pack_end_time = new Date()

    order
        .save()
        .then(() => {
            return res.status(200).json({ success: true, id: order._id, message: 'Order updated!', })
        })
        .catch(error => {
            return res.status(404).json({ error, message: 'Order not updated!', })
        })
}

seedOrders = async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ success: false, error: 'You must login before seeding orders', })
    } else if (!req.session.isSupervisor) {
        return res.status(403).json({ success: false, error: 'Only supervisors can seed orders', })
    }

    let ordersCreated = false
    let orderCreationError = ''
    const orderStatuses = ['unpicked', 'unpacked', 'packed']

    for (let i = 0; i < 100; i++) {
        if (orderCreationError !== '') {
            break
        }

        // Create a variety of unpicked, unpacked, and fully packed orders
        const orderStatus = orderStatuses[Math.floor(Math.random() * 3)]

        // Generate random times
        const weeksAgo = Math.floor(Math.random() * 6)
        const recentDate = Faker.date.recent() - (weeksAgo * 7 * 24 * 3600 * 1000)
        const pick_start_time = recentDate
        const pick_end_time = pick_start_time + Faker.datatype.number(options = {min: 30000, max: 180000})
        const pack_start_time = pick_end_time + Faker.datatype.number(options = {min: 300000, max: 600000})
        const pack_end_time = pack_start_time + Faker.datatype.number(options = {min: 30000, max: 180000})

        // Get a random employee
        const userCount = await User.countDocuments({ email: { $ne: 'supervisor' }})
        const random = Math.floor(Math.random() * userCount)
        const random_user = await User.find({ email: { $ne: 'supervisor' }}).skip(random).limit(1)

        const data = {
            picked_by:       (orderStatus === 'unpacked' || orderStatus === 'packed') ? random_user[0].email : undefined,
            pick_start_time: (orderStatus === 'unpacked' || orderStatus === 'packed') ? pick_start_time : undefined,
            pick_end_time:   (orderStatus === 'unpacked' || orderStatus === 'packed') ? pick_end_time : undefined,
            pack_start_time: (orderStatus === 'packed') ? pack_start_time : undefined,
            pack_end_time:   (orderStatus === 'packed') ? pack_end_time : undefined,
        }

        const order = new Order(data)

        if (!order) {
            ordersCreated = false
            orderCreationError = err
        } else {
            order
            .save()
            .then(() => {
                ordersCreated = true
            })
            .catch(error => {
                ordersCreated = false
                orderCreationError = error
            })
        }
    }

    if (ordersCreated) {
        return res.status(201).json({ success: true, message: 'Orders created!', })
    } else {
        return res.status(400).json({ orderCreationError, message: 'Orders not created!', })
    }
}

module.exports = {
    createOrder,
    getOrders,
    startPick,
    stopPick,
    startPack,
    stopPack,
    seedOrders
}
