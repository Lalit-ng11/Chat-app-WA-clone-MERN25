const express = require('express');
const coookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require('./config/dbConnect');
const bodyParser = require('body-parser')
const authRoute = require('./routes/authRoute')
const chatRoute = require('./routes/chatRoute')
const statusRoute = require('./routes/statusRoute')
const http =require('http')
const initializeSocket = require('./services/socketService')

dotenv.config();

const PORT = process.env.PORT;
const app = express();

const corsOption= {
    origin:process.env.FRONTEND_URL,
    credentials:true
}

app.use(cors(corsOption))
// middleware

app.use(express.json())//parse body data
app.use(coookieParser())// parse token on every request
app.use(bodyParser.urlencoded({extended:true}));


//data base connection
connectdb();

// create server

const server = http.createServer(app)

const io = initializeSocket(server)

//apply socket middleware before routes
app.use((req,res,next)=>{
    req.io = io;
    req,socketUsermap = io.socketUsermap
    next();
})




// routes
app.use('/api/auth',authRoute)
app.use('/api/chat',chatRoute)
app.use('/api/status',statusRoute)

server.listen(PORT,()=>{
    console.log(`server running on this port ${PORT}`)
})