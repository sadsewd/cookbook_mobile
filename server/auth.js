import express from 'express'
import db from './db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// dotenv.config()

const router = express.Router()

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body

//   db.query(`SELECT * FROM users WHERE email = ?`, email, (err, result) => {
//     if (err) res.status(500).json({ message: err.message })
//     else {
//       if (result.length < 1) {
//         res.send({ message: 'Invalid credentials' })
//         return
//       }
//       if (result.length > 1) {
//         res.send({ message: 'Duplicate accounts' })
//         return
//       }

//       const user = result[0]
//       const isCorrectPass = bcrypt.compareSync(password, user.password)

//       if (isCorrectPass) {
//         // const tokens = updateTokens(user)
//         res.cookie('session', 'dark_theme', {
//           maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//           httpOnly: true,
//           sameSite: 'strict',
//         })
//         res.sendStatus(200)
//       } else res.send({ message: 'Invalid credentials' })
//     }
//   })
// })

// const updateTokens = (user) => {
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: '30s',
//   })

//   db.query(
//     `UPDATE users SET refresh_token = ? WHERE users_id = ?`,
//     [refreshToken, user.users_id],
//     (err) => {
//       if (err) {
//         res.status(500).json({ message: err.message })
//       } else {
//         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//           httpOnly: true,
//           sameSite,
//         })

//         res.send({ message: 'Updated entry: ' + id })
//       }
//     }
//   )

//   res.send({
//     accessToken: accessToken,
//   })
// }

// router.post('/logout', async (req, res) => {
//   db.query(
//     `UPDATE users SET refresh_token = null WHERE refresh_token = ?`,
//     req.body.refreshToken,
//     (err) => {
//       if (err) {
//         res.status(500).json({ message: err.message })
//       } else {
//         res.send({ message: 'Logged out' })
//       }
//     }
//   )
// })

export default router
