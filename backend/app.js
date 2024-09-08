const express = require('express');
require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const availabilityRoutes = require('./routes/availabilityRoutes');
const userAuthRoutes = require('./controller/UserAuth');
const adminAuthRoutes = require('./controller/AdminAuth');

const app = express();

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userAuthRoutes);  // User authentication routes
app.use('/admin', adminAuthRoutes); // Admin authentication routes


app.use('/api', availabilityRoutes);

app.listen(PORT, ()=>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('App started'))
    .catch(err => console.log(err));
})

