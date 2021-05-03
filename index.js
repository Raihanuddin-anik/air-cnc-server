var express = require('express');
var cors = require("cors");
var bodyParser = require('body-parser');
var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://air-cnc:lqMnx0diurKK6m3D@cluster0.ostva.mongodb.net/air-cnc?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("air-cnc").collection("travelers-info");
  const hotelCollection = client.db("air-cnc").collection("hotel-info");

  app.post('/addProduct', (req, res) => {
    const products = req.body

    hotelCollection.insertMany(products)
      .then(result => {
        console.log(result.insertedCount)
        res.send(result.insertedCount > 0)

      })

  })

  app.get('/homeData/:key',(req, res) =>{
    hotelCollection.find({key: req.params.key})
      .toArray((err, document)=>{
        
        res.send(document[0])
      })
  })

  app.get('/products', (req, res) => {
    hotelCollection.find({})
      .toArray((err, document) => {
      
        res.send(document)
      }) 
  })

  app.post("/insert", (req, res) => {
    const data = req.body
    collection.insertOne(data)
      .then(result => {
        console.log('result')
      })
  })

});



app.listen( process.env.PORT || 4000)