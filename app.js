const express = require('express');
const mongoose = require('mongoose');
var isodate = require("isodate");
const cors = require('cors')
const port = process.env.PORT || 3000;
const app = express();
const mongo = mongoose.connect('mongodb://mongodb:27017/solardata', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(cors());
const bandRouter = express.Router();
//this is all it takes to get the route setup
app.use('/api', bandRouter);
const Band = require('./models/bandwidthModel');
const Solar = require('./models/solarwdModel');
const Fleet = require('./models/fleetModel');
const Ship = require('./models/shipModel');
const { startSession } = require('mongoose');
 


bandRouter.route('/solarbydate/:Fleet/:start_date/:end_date')
    .get(async (req, res)=>{
      
      const page = req.query.page || 1
      const fleet = req.params.Fleet
      const start_date = isodate(req.params.start_date);
      const end_date = isodate(req.params.end_date);
        
     
        const options = {
            page: page,
            limit: 10,
            collation: {
              locale: 'en'
            }
          };
       const aggregate = Solar.aggregate();
            aggregate.match({
             Fleet: fleet,
            Date_sp: { $gte: isodate(start_date),
                              $lte: isodate(end_date)
                  }
             
            }).allowDiskUse(true);;
        
             
          const sol = await Solar.aggregatePaginate(aggregate, options)
          .then(function(sol){
              res.json(sol);
          }).catch(function(err){ 
            console.err(err)
      });

    })



bandRouter.route('/bands')
    .get((req, res)=>{
        const options = {
            page: 1,
            limit: 10,
            collation: {
              locale: 'en'
            }
          };
            Band.paginate({}, options)
            .then(function(result){
                res.json(result);
            });
    });

  bandRouter.route('/solar/:Fleet')
    .get(async (req, res)=>{
        const page = req.query.page || 1
      const fleet = req.params.Fleet
      
      console.log(fleet)
        const options = {
            page: page,
            limit: 50,
            collation: {
              locale: 'en'
            }
          };
       const aggregate = Solar.aggregate();
            aggregate.match({
              Fleet: fleet
           
            
            }).allowDiskUse(true);;
     

          const sol = await Solar.aggregatePaginate(aggregate, options)
          .then(function(sol){
              res.json(sol);
          }).catch(function(err){ 
            console.err(err)
      });

    })

    

    bandRouter.route('/fleetdata')
    .get((req, res)=>{
        const page = req.query.page || 1
        const options = {
            page: page,
            limit: 100,
            collation: {
              locale: 'en'
            }
          };

          Fleet.paginate({}, options)
          .then(function(result){
              res.json(result);
          });

    })

    bandRouter.route('/shipdata')
    .get((req, res)=>{
        const page = req.query.page || 1
        const options = {
            page: page,
            limit: 300,
            collation: {
              locale: 'en'
            }
          };

          Ship.paginate({}, options)
          .then(function(result){
              res.json(result);
          });

    })


    bandRouter.route('/solar')
    .get( async (req, res)=>{
        const page = req.query.page || 1
        const options = {
            page: page,
            limit: 10,
           
          };
    const aggregate = Solar.aggregate();
    aggregate.allowDiskUse(true);;
    console.log(aggregate)
    console.log(options)

    const sol = await Solar.aggregatePaginate(aggregate, options)
    .then(function(sol){
        res.json(sol);
    }).catch(function(err){ 
      console.err(err)
        });
      });    


app.get('/', (req, res)=>{
    res.send("Welcome to my Api!");
});

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
});