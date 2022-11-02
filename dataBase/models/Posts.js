const { Schema, model } = require('mongoose');

const postScheme = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    picture: { type: String },
});


module.exports = model('Posts', postScheme);
