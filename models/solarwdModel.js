const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
// const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const {Schema} = mongoose;




const solarwdModel = new Schema(
    {
    
    Fleet:   {type: String, required: true},
    Ship : {type: String, required: true},
    hourly : {type: Number, required: true},
    Date : {type: Date, required: false},
    InAvg15min : {type: Number, required: false},
    InMinBps  : {type: Number, required: false},
    InMaxBps  : {type: Number, required: false},
    OutAvg15min : {type: Number, required: false},
    OutMinBps  : {type: Number, required: false},
    OutMaxBps  : {type: Number, required: false}
    
    },
    { collection: 'solwinds' }
);
solarwdModel.plugin(mongoosePaginate);

module.exports = mongoose.model('solardata', solarwdModel)