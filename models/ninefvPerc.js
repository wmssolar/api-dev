const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
// const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const {Schema} = mongoose;



const ninefvPercModel = new Schema(
    {
    DateOfWeek: {type: Date, required: true},
    NodeID : {type: Number, required: true},
    InterfaceID : {type: Number, required: true},
    Fleet:   {type: String, required: true},
    ShipName : {type: String, required: true},
    Maxbps_In95thKpbs: {type: Number, required: false},
    Maxbps_Out95thKpbs:  {type: Number, required: false},
    Maxbps_95thKpbs:  {type: Number, required: false},
 
    
    },
    { collection: '95thPercentile' }
);
ninefvPercModel.plugin(mongoosePaginate);

module.exports = mongoose.model('ninefvPerc', ninefvPercModel)