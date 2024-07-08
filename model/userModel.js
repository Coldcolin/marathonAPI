const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String,
        required: true,
    },
    DOB:{
        type: String,
        required: true,
    },
    Sex:{
        type: String,
        required: true,
    },
    Status:{
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    Address:{
        type: String,
        required: true,
    },
    LGA: {
        type: String,
        required: true,
    },
    Ward: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    StateLGA: {
        type: String,
        required: true,
    },
    EmergencyFirstName: {
        type: String,
        required: true,
    },
    EmergencyRelationship: {
        type: String,
        required: true,
    },
    EmergencyLastName: {
        type: String,
        required: true,
    },
    EmergencyPhone: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    shirt: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const userModel = mongoose.model('marathonUsers', userSchema);

module.exports = userModel;