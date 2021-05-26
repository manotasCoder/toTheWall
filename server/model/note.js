const { Schema, model } = require('mongoose');

const NoteSchema = Schema({
    title: {
        type: String,
        required: [true, 'title is mandatory']
    },
    content: {
        type: String,
        required: [true, 'content is mandatory']
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('Note', NoteSchema);