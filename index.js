const express = require("express")
const mongoose = require("mongoose")
const Users = require("./src/models/users")
const { register, login, findUser } = require("./src/Controllers/users")
const server = express()
const cors = require("cors")
const { verifyToken} = require("./src/Middlewares")
const {validateForm,isValidated} = require("./src/Middlewares/index")
const {addForm} = require("./src/Controllers/Form")
server.use(express.json())
server.use(cors())
const http = require ("http")
const {Server} = require("socket.io")

const app = http.createServer(server)
const io = new Server(app)
server.get("/", (req, res) => {

    res.status(200).json({
        uname: "akanksha",
        uphone: "8298213333"
    })

})
server.post("/register",register)
server.post("/login",login) 
server.get("/get-user",verifyToken,findUser)
server.post("/addForm",validateForm,isValidated,addForm)
   
  io.on("connection",(socket) => {
    console.log("new user connected");
    socket.on("message",(message,room)=>{
        console.log(`New message recived in ${room} and message is ${message}`);
        socket.to(room).emit('message',message)
      })
      socket.on("join",(room)=>{
        socket.join(room)
        socket.emit("joined")
      })
    }
  )
  
    
    mongoose.connect("mongodb://localhost:27017")
        .then(data => console.log("Database Connected"))
        .catch(errore => console.log("Error"))

        

const { join } = require('node:path');



server.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});