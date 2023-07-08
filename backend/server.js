const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.urlencoded({extended : true}))
app.use(express.json());
const server = require('http').createServer(app);
const { Server } = require('socket.io');

const io = new Server(server,{
    cors: {
      origin: 'http://localhost:5173',
    }
  });


const connection = require('./Connection/connectionManager');
connection(io);

app.use('/auth', require('./routes/authRoutes'));


app.use((err,req,res,next) => {
    res.status(500).json({
        message: err.message
    })
})


server.listen(3000, () => {
    console.log(`server is listening on port 3000`);
})

