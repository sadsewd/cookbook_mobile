import express from 'express'
import general from './general.js'
import custom from './custom.js'
import auth from './auth.js'

const router = express.Router()

router.use('/auth', auth)
router.use('/custom', custom)

router.use('/users', general)
router.use('/recipes', general)
router.use('/ingredients', general)
router.use('/steps', general)

export default router
