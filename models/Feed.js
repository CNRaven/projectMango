const mongoose = require('mongoose');

const FeedGroupSchema = new mongoose.Schema([{
    dateTimeCreated: {
        type : Date
    },
    createdBy: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 1
    }
}]);

module.exports = mongoose.model('FeedGroup', FeedGroupSchema);