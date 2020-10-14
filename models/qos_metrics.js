const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose;



const qosModel = new Schema(
    {
   
    Latency: {type: Number, required: true},
    PacketLoss: {type: Number, required: true},
    MOS:   {type: Number, required: true},
    Jitter : {type: Number, required: true},
    
  
    
    },
    { collection: 'qos_metrics' }
);
qosModel.plugin(mongoosePaginate);

module.exports = mongoose.model('qos_metrics', qosModel)