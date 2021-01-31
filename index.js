const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;

const app = express()

app.use(bodyParser.json()) ;
app.use(cors()) ;

const port = 5000


const uri = "mongodb+srv://volenteerDB:Tareq123!<>{}@cluster0.wtkjn.mongodb.net/volenteerDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });


app.get('/', (req, res) => {
  res.send('Hello World!')
})




client.connect(err => {
  const servicesCollection = client.db("volenteerDB").collection("primaryServiceDB");
  
  // sending all of the Data to the server
  // As i have already sent once to the backend , so i currently not using it
  app.post('/addService' , (req , res ) => {
    const service = req.body ;
    console.log(service)
    servicesCollection.insertMany(service) 
    .then( result => {
      console.log(result.insertedCount);
      res.send(result.insertedCount)
    })
  })

  // getting all of of the data from Server

  app.get( '/service' , ( req , res ) =>{
    servicesCollection.find({}).limit(20)
    .toArray( ( err , documents ) =>{
      res.send(documents) ;
      console.log(documents) ;
    })

  })


});




client.connect(err => {
  const servicesCollection = client.db("volenteerDB").collection("registeredUser");

    //sending perticular user data - this data is coming from registration.js on client site 

    app.post('/volenteer/data' , (req , res ) => {
      const registeredAc = req.body ;
      // console.log(registeredAc) ;  // this will be shown in the local server command line
      servicesCollection.insertOne(registeredAc) 
      .then( result => {
        console.log(result.insertedCount);
        console.log(result.ops);
        // res.send(result.insertedCount)
      })
    })

    app.get('/user' ,(req , res) => {
      servicesCollection.find({})
      .toArray(( err , documents ) => {
        res.send (documents);
      })
    })

})




app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})