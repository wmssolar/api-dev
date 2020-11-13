const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose;



const qosModel = new Schema(
    {
    Fleet: {type: String, required: true},
    ShipName: {type: String, required: true},
    Latency: {type: Number, required: true},
    PacketLoss: {type: Number, required: true},
    MOS:   {type: Number, required: true},
    Jitter : {type: Number, required: true},
    Date_Time: {type: Date, required: true},
    },
     { collection: 'qos_metrics' }
);
qosModel.plugin(mongoosePaginate);

module.exports = mongoose.model('qos_metrics', qosModel)