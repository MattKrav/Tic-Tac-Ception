const mongoose = require('mongoose');

const globalStatSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
}, {
    timestamps: true,
});

const GlobalStat = mongoose.model('GlobalStat', globalStatSchema);

module.exports = GlobalStat;