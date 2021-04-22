const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        picked_by: { type: String },
        pick_start_time: { type: Date },
        pick_end_time: { type: Date },
        pack_start_time: { type: Date },
        pack_end_time: { type: Date },
    },
    { timestamps: true },
)

module.exports = mongoose.model('orders', Order)
