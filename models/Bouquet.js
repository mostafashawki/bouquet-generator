const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');


// Create Schema
const BouquetSchema = new Schema({
    bouquetSpec: {
        type: String,
        max:50,
        required: true
        //,
        //unique: true
    },
    name: {
        type: String,
        max:1,
        required: true
    },
    size: {
        type: String,
        max:1,
        required: true
        },
    flowers:[{
        species: {
        //   type: Schema.Types.ObjectId, (for real app we should use ref, as a foreign key)
        //   ref: 'flower'
             type: String,
             max:1  
            },  
        qty: {
          type: Number,
          min: 1,
          max: 99
          //,
          //required: true
        }
    }],
    stock: {
        type: Number,
        min:0,
        max:9999,
        default: 0
    },
    priority: {
        type: Number,
        default: Math.floor((Math.random() * 10) + 1) //assumed to be from our data analysis & AI 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports  = mongoose.model('bouquet', BouquetSchema);

//BouquetSchema.plugin(uniqueValidator);
