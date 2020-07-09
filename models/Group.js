const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    createdDateTime: {
        type: Date
    },
    createdBy: {
        type: String
    },
    admins: [{
        type: String
    }],
    members: [{
        type: String
    }],
    feed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'feedGroup' }]
});

module.exports = mongoose.model('Group', GroupSchema);