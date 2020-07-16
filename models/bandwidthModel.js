const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose;



const bandwidthModel = new Schema(
    {
    Date: {type: Date, required: true},
    Caption:   {type: String, required: true},
    Ship : {type: String, required: true},
    Fleet : {type: String, required: true},
    Transmit_ITBD_Average_BW_Utilization : {type: Number, required: false},
    Received_ITBD_Average_BW_Utilization : {type: Number, required: false},
    ITBD_Highest_Utilization_Transmit : {type: Number, required: false},
    ITBD_Highest_Utilization_Received : {type: Number, required: false},
    Interface_InterfaceSpeed : {type: String, required: true},
    Transmit_Average_BW_Percentage : {type: Number, required: false},
    Received_Average_BW_Percentage: {type: Number, required: false}
    },
    { collection: 'bandwidth' }
);
bandwidthModel.plugin(mongoosePaginate);

module.exports = mongoose.model('Bandwidth', bandwidthModel)