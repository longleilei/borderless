const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const stripe = require('stripe')('sk_test_51IItKuK4WEietHlOL21CTsumXQpnoX0E0OKsKKOmJa0yupxrGxwp7AT9T5VOq2UYNdDjIIBSeKxDDe1TMk0exC3300QgGKb2Su'); 
const { v4: uuidv4 } = require('uuid');

const userRoutes = require("./routes/users.js"); 

const app = express(); 

app.use(bodyParser.json({ limit: '30mb', extended: true })); 
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true})); 
app.use(cors());

//routes for auth
app.use('/user', userRoutes); 

//routes for stripe --> move to routes 
app.post("/topup", (req, res) => {

    const { topup, token } = req.body; 
    console.log("TOPUP", topup); 
    console.log("AMOUNT", topup.amount); 
    const idempotencyKey = uuid(); 
  
    return stripe.customers.create({ 
      email: token.email, 
      source: token.id
    })
    .then(customer => {
      stripe.charges.create({
  
        amount: topup.price * 100, 
        currency: 'usd', 
        customer: customer.id
  
      }, {idempotencyKey})
    })
    .then(result => status(200).json(result))
    .catch(err => console.log(err))
  
  }); 


const CONNECTION_URL = 'mongodb+srv://nastya:oFsknak11*$53@cluster0.gfuvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000; 

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => 
        console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch(error => console.log(`${error} did not connect`)); 

mongoose.set('useFindAndModify'); 