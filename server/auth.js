import express from 'express'
import db from './db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  db.query(`SELECT * FROM users WHERE email = ?`, email, (err, result) => {
    if (err) res.status(500).json({ message: err.message })
    else {
      if (result.length < 1) {
        res.status(403).send({ message: 'Invalid credentials' })
        return
      }
      if (result.length > 1) {
        res.status(403).send({ message: 'Duplicate accounts' })
        return
      }

      const user = result[0]
      const isCorrectPass = bcrypt.compareSync(password, user.password)

      if (isCorrectPass) {
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

        db.query(
          `UPDATE users SET refresh_token = ? WHERE users_id = ?`,
          [refreshToken, user.users_id],
          (err) => {
            if (err) {
              res.status(500).json({ message: err.message })
            } else {
              const accessToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET
              )

              res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
              })
              res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 30,
                httpOnly: true,
                sameSite: 'strict',
              })
              res.status(200).send({ id: user.users_id })
            }
          }
        )
      } else res.status(403).send({ message: 'Invalid credentials' })
    }
  })
})

router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  console.log(req.cookies)

  if (!refreshToken) return res.status(401).json({ message: 'No token' })

  db.query(
    `SELECT refresh_token FROM users WHERE refresh_token = ?`,
    refreshToken,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        if (!result.length)
          return res.status(403).json({ message: 'Invalid token' })
        if (result[0].refresh_token != refreshToken)
          return res.status(403).json({ message: 'Invalid token' })

        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid token' })

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

            res.cookie('accessToken', accessToken, {
              maxAge: 1000 * 10,
              httpOnly: true,
              sameSite: 'strict',
            })
            res.sendStatus(200)
          }
        )
      }
    }
  )
})

router.post('/logout', async (req, res) => {
  db.query(
    `UPDATE users SET refresh_token = null WHERE refresh_token = ?`,
    req.cookies.refreshToken,
    (err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.send({ message: 'Logged out' })
      }
    }
  )
})

export default router
