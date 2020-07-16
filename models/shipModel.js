const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose;



const shipModel = new Schema(
    {
   
    Fleet:   {type: String, required: true},
    Vessel:   {type: String, required: true},
    CruiseLineID : {type: Number, required: false},
  
    
    },
    { collection: 'Vessels' }
);
shipModel.plugin(mongoosePaginate);

module.exports = mongoose.model('shipdata', shipModel)