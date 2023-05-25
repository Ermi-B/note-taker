const router = require('express').Router()

const notesRouter = require('./notesRoutes')

notesRouter.use('/notes',notesRouter)

module.exports = notesRouter


