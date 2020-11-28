const express = require('express');
const mongoose = require('mongoose');
// var isodate = require('./node_modules/isodate/isodate');
const cors = require('cors')
const port = process.env.PORT || 3001;
console.log(process.env)
const app = express();
const mongo = mongoose.connect('mongodb://mongodb:27017/solardata', { useNewUrlParser: true, useUnifiedTopology: true })
const morgan = require('morgan')
 
app.use(morgan('tiny'))
// so the star allows me to send request the host server from with its ip
var corOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corOptions));
// app.use(cors({
//   origin: 'http://localhost:3000', 
//   allowedHeaders: [ 'Accept-Version', 'Authorization', 'Credentials', 'Content-Type',' X-Requested-With' ],
 
// }));

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
const ninetyFivePer = require('./models/ninefvPerc');
const ports = require('./models/Ports');
const revenue = require('./models/revenue');


// var rfs = require('fs');
// var morgan = require('morgan');
// var path = require('/usr/src/app')
// var rfs = require('rotating-file-stream')

// var accessLogStream = rfs.createReadStream('access.log', {
//   interval: '1d',
//   path: path.join(__dirname, 'log')
// });

// app.use(morgan('combined', {stream: accessLogStream}))

bandRouter.route('/ninetyFiveTotal/:Fleet/:Ship/:start_date/:end_date')
.get( (req, res)=>{



    const page = req.query.page || 1
    const fleet = req.params.Fleet;
     const ship  = req.params.Ship;
     const start_date = new Date(req.params.start_date);
     const end_date = new Date(req.params.end_date);
  
  
    const options = {
        page: page,
        limit: 25,
        
        collation: {
          locale: 'en'
        }
      };

      const aggregate =  ninetyFivePer.find({
        Fleet: { $eq: fleet },
        ShipName: {$eq: ship},
        DateOfWeek: {
           $gte: new Date(start_date),
          $lte: new Date(end_date)
         }
      });
 
      ninetyFivePer.paginate(aggregate, options)
      .then(function(result){
          res.json(result);
          console.log(result);
          // console.log(req.params);
           
      }).catch(function(){ 
        console.error()
  });

});


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
        
             
    const sol = Solar.paginate(aggregate, options)
          .then(function(sol){
              res.json(sol);
              
          }).catch(function(){ 
            console.error()
      });

    });


    bandRouter.route('/revenue')
    .get((req, res)=>{
      

   
      

      const page = req.query.page || 1
     
      const options = {
        page: page,
        limit: 20,
        lean: true,
        pagination: true,
         
        collation: {
          locale: 'en'
        }
      };
    const aggregate = revenue.find({
    
    
    });
        
             
    const sol = revenue.paginate(aggregate, options)
          .then(function(sol){
              res.json(sol);
              
          }).catch(function(){ 
            console.error()
      });
    });

bandRouter.route('/ports')
.get((req, res)=>{


  const page = req.query.page || 1
 
  const options = {
    page: page,
    limit: 20,
    lean: true,
    pagination: true,
     
    collation: {
      locale: 'en'
    }
  };
const aggregate = ports.find({


});
    
         
const sol = ports.paginate(aggregate, options)
      .then(function(sol){
          res.json(sol);
          
      }).catch(function(){ 
        console.error()
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
              
          }).catch(function(){ 
            console.error()
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
         const start_date = new Date(req.params.start_date);
         const end_date = new Date(req.params.end_date);
      
      
        const options = {
            page: page,
            limit: 15,
            
          
            collation: {
              locale: 'en'
            }
          };

          const aggregate =  Solar.find({
            Fleet: { $eq: fleet },
            Ship:   {$eq: ship},
            Date: { $gte: new Date(start_date),
              $lte: new Date(end_date)
             }
          });
     
           Solar.paginate(aggregate, options)
          .then(function(sol){
              res.json(sol);
               
          }).catch(function(){ 
            console.error()
      });

    });
 
bandRouter.route('/ninetyfivePercent/:Fleet/:Ship/:start_date/:end_date')
.get( (req, res)=>{
    const page = req.query.page || 1
    const fleet = req.params.Fleet;
     const ship  = req.params.Ship;
     const start_date = new Date(req.params.start_date);
     const end_date = new Date(req.params.end_date);
  
  
    const options = {
        page: page,
        limit: 1,
        
        collation: {
          locale: 'en'
        }
      };

      const aggregate =  ninetyFivePer.find({
        Fleet: { $eq: fleet },
        ShipName: {$eq: ship},
        DateOfWeek: {
           $gte: new Date(start_date),
          $lte: new Date(end_date)
         }
      });
 
      ninetyFivePer.paginate(aggregate, options)
      .then(function(result){
          res.json(result);
     
          // console.log(req.params);
           
      }).catch(function(){ 
        console.error()
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

    });


// /:start_date
    bandRouter.route('/qos/:Fleet/:Ship/:start_date')
    .get((req, res)=>{
       
       

         const page = req.query.page || 1

         const fleet = req.params.Fleet;
         const ship  = req.params.Ship;
        const start_date = new Date(req.params.start_date);


        const options = {
            page: page,
            limit: 1,
           
            collation: {
              locale: 'en'
            }
          };


      const aggregate =  QOS.find({
        Fleet: { $eq: fleet },
        ShipName: {$eq: ship},
        Date_Time: {
           $gte: new Date(start_date),
        
         }
      });

          QOS.paginate(aggregate, options)
          .then(function(result){
              res.json(result);
              console.log(result);
          });

    });

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
                
          }).catch(function(){ 
            console.error()
      });
   });    


app.get('/', (req, res)=>{
    res.send("Welcome to my Api!");
});

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
});