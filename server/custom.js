import express from 'express'
import db from './db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const authenticateSession = (req, res, next) => {
  const accessToken = req.cookies.accessToken
  if (!accessToken) return res.sendStatus(401)

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' })
    } else {
      console.log(user)
      req.user = user
      next()
    }
  })
}

router.get('/userRecipes', authenticateSession, async (req, res) => {
  const table = 'recipes'
  const column = 'users_id'
  const id = req.user.id

  db.query(
    `SELECT * FROM ?? WHERE ?? = ?`,
    [table, column, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.json(result)
      }
    }
  )
})

export default router
