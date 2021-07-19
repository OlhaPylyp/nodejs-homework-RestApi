require('dotenv').config()
const app = require('../app')

const { connectMongo } = require('../src/db/connection.js')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log('add new client')
  socket.on('Chat_Message', ({ message, userName }) => {
    io.emit('Chat_Update', { message, userName })
  })
})
const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectMongo()
    server.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log(`Error on server start ${error.message}`)
  }
}

start()
