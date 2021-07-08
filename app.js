const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const path = require('path')
const contactsRouter = require('./src/routes/api/contactsRouter')
const authRouter = require('./src/routes/api/authRouter')
const uploadRouter = require('./src/routes/api/filesRouters')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public', 'avatars')))
app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)
app.use('/api/upload', uploadRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
