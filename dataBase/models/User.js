const { Schema, model } = require('mongoose');

const userScheme = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('User', userScheme);

