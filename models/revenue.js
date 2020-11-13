const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {Schema} = mongoose;



const revenueModel = new Schema(
    {
        
        TheirCarrierName:   {type: String, required: true},
        Total_Charges:   {type: Number, required: true},
        TotalMinutes: {type: Number, required: true},
        TotalAirCharges: {type: Number, required: true},
      
    
    },
    { collection: 'RevenueCarrier'}
);
revenueModel.plugin(mongoosePaginate);

module.exports = mongoose.model('RevenueCarrier', revenueModel)