const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose;



const qostableModel = new Schema(
    {
   
    DateTime: {type: Date, required: true},
    MOS:   {type: Number, required: true},
    Jitter : {type: Number, required: true},
    Latency:   {type: Number, required: true},
    PacketLoss : {type: Number, required: true},
    ShipName: {type: String, required: true},
    Fleet: {type: String, required: true},
  
    
    },
    { collection: 'qostable' }
);
qostableModel.plugin(mongoosePaginate);

module.exports = mongoose.model('qostable', qostableModel)