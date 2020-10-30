const express = require('express');
const mongoose = require('mongoose');
var isodate = require('./node_modules/isodate/isodate');
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
const Pareto = require('./models/ParetoChart');
const QOS = require('./models/qos_metrics');
const qostable = require('./models/qostable');


bandRouter.route('/solar/setStart_Date')
    .get((req, res)=>{
      
      const page = req.query.page || 1
     
      const options = {
        page: page,
        limit: 1,
        lean: true,
        pagination: true,
        sort: { Date:  "asc" },
        collation: {
          locale: 'en'
        }
      };
   const aggregate = Solar.find({
    

   });
        
             
          const sol =   Solar.paginate(aggregate, options)
          .then(function(sol){
              res.json(sol);
              
          }).catch(function(err){ 
            console.err(err)
      });

    });


    bandRouter.route('/solar/setEnd_Date')
    .get((req, res)=>{
      
      const page = req.query.page || 1
      // const startDate = Date_sp;
        const options = {
            page: page,
            limit: 1,
            lean: true,
            pagination: true,
             sort: { Date:  "descending" },
            collation: {
              locale: 'en'
            }
          };
       const aggregate = Solar.findOne({
         

       }) 
            
        
          const sol =  Solar.paginate(aggregate, options)
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
            limit: 20,
            collation: {
              locale: 'en'
            }
          };
            Band.paginate({}, options)
            .then(function(result){
                res.json(result);
            });
    });
 
  bandRouter.route('/solar/:Fleet/:Ship/:start_date/:end_date')
    .get( (req, res)=>{
        const page = req.query.page || 1
        const fleet = req.params.Fleet;
         const ship  = req.params.Ship;
         const start_date = isodate(req.params.start_date);
         const end_date = isodate(req.params.end_date);
      
      
        const options = {
            page: page,
            limit: 25,
            
          
            collation: {
              locale: 'en'
            }
          };

          const aggregate =  Solar.find({
            Fleet: { $eq: fleet },
            Ship:   {$eq: ship},
            Date: { $gte: isodate(start_date),
              $lte: isodate(end_date)
             }
          });
     
           Solar.paginate(aggregate, options)
          .then(function(sol){
              res.json(sol);
               
          }).catch(function(err){ 
            console.err(err)
      });

    });

    

    bandRouter.route('/fleetdata')
    .get((req, res)=>{
        const page = req.query.page || 1
        const options = {
            page: page,
            limit: 50,
            collation: {
              locale: 'en'
            }
          };

      
      

      Fleet.paginate({}, options)
        .then(function(result){
            res.json(result);
            console.log(result)
        });

       

    });



    bandRouter.route('/shipdata')
    .get((req, res)=>{
        const page = req.query.page || 1
        const options = {
          page: page,
          limit: 500,
     
            collation: {
              locale: 'en'
            }
          };

          Ship.paginate({}, options)
          .then(function(result){

              res.json(result);
             
          });

    })


    bandRouter.route('/qos')
    .get((req, res)=>{
       
         const page = req.query.page || 1
        const options = {
            page: page,
            limit: 1,
            collation: {
              locale: 'en'
            }
          };

          QOS.paginate({}, options)
          .then(function(result){
              res.json(result);
          });

    })

    bandRouter.route('/qostable')
    .get((req, res)=>{
       
         const page = req.query.page || 1
        const options = {
            page: page,
            limit: 5,
            collation: {
              locale: 'en'
            }
          };

          qostable.paginate({}, options)
          .then(function(result){
              res.json(result);
          });

    })

    bandRouter.route('/paretochart')
    .get((req, res)=>{
       
         const page = req.query.page || 1
        const options = {
            page: page,
            limit: 1,
            collation: {
              locale: 'en'
            }
          };

          Pareto.paginate({}, options)
          .then(function(result){
              res.json(result);
          });

    })


    bandRouter.route('/solar')
    .get( (req, res)=>{
        const page = req.query.page || 1
        // const date = req.params.Date_sp

        const options = {
            page: page,
             limit: 100,
           
          };
          const aggregate =  Solar.find({
            
          });
  
           Solar.paginate(aggregate, options)
          .then(function(sol){
              res.json(sol);
                
          }).catch(function(err){ 
            console.err(err)
      })
   });    


app.get('/', (req, res)=>{
    res.send("Welcome to my Api!");
});

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
});