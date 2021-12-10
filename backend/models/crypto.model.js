const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cryptoSchema = new Schema({

     tokenName: {
         type: String,
         required: true,
         trim: true
     },
     priceUsd: {
        type: Number,
        required: true,
        trim: true
     },
     
 
}, {
    timestamps: true
});

const Crypto = mongoose.model('crypto', cryptoSchema);

module.exports = Crypto;