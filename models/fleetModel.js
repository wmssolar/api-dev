const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
// const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const {Schema} = mongoose;



const fleetModel = new Schema(
    {
   
    Fleet:   {type: String, required: true},
    CruiseLineID : {type: Number, required: false},
  
    
    },
    { collection: 'Fleet' }
);
fleetModel.plugin(mongoosePaginate);

module.exports = mongoose.model('fleetdata', fleetModel)