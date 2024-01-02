require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); // Import the cors middleware
const userRoute = require('./routes/api/users')
const authRoute = require('./routes/api/auth')
const profileRoute = require('./routes/api/profile')
const postRoute = require('./routes/api/posts')

const app = express()

// //MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);
  
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.on('open', () => console.log('We are now connected to the database'));



app.get('/', (req,res) => res.send({title: 'Developer Platform'}))


//Define Routes
app.use(cors());
app.use(express.json({extended: false}))
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/profile', profileRoute)
app.use('/api/posts', postRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`))