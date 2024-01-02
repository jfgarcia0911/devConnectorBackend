const express = require('express')
const connectDB = require('./config/db')
// const cors = require('cors'); // Import the cors middleware
const userRoute = require('./routes/api/users')
const authRoute = require('./routes/api/auth')
const profileRoute = require('./routes/api/profile')
const postRoute = require('./routes/api/posts')
const path = require('path')

const app = express()

//Connect database
connectDB();

//Init Middleware
app.use(express.json({extended: false}))

// Enable CORS for all routes
// app.use(cors());

//Comment-out not to be included
// app.get('/', (req,res) => res.send('API Running'))


//Define Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/profile', profileRoute)
app.use('/api/posts', postRoute)

//Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`))