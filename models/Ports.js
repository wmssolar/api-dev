const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose;

const portsModel = new Schema(
    {
       
        port_name:   {type: String, required: true},
        latitude:   {type: Number, required: true},
        longitude: {type: Number, required: true},
        trigger_distance: {type: Number, required: true},
      
    
    },
    { collection: 'Ports'}
);
portsModel.plugin(mongoosePaginate);

module.exports = mongoose.model('Ports', portsModel)