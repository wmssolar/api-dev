const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose;



const paretoModel = new Schema(
    {
   
    ShipName: {type: String, required: true},
    Fleet: {type: String, required: true},
    mos:   {type: Number, required: true},
    mper : {type: Number, required: true},
    jitter:   {type: Number, required: true},
    jper : {type: Number, required: true},
    latency:   {type: Number, required: true},
    lper : {type: Number, required: true},
    packtloss:   {type: Number, required: true},
    pper : {type: Number, required: true},
  
    
    },
    { collection: 'Pareto' }
);
paretoModel.plugin(mongoosePaginate);

module.exports = mongoose.model('pareto', paretoModel)