import express from 'express'
import db from './db.js'
import moment from 'moment'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

const authenticateSession = (req, res, next) => {
  const accessToken = req.cookies.accessToken
  if (!accessToken) return res.sendStatus(401)

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' })
    } else {
      next()
    }
  })
}

router.get('/', authenticateSession, async (req, res) => {
  const table = req.baseUrl.slice(1)

  db.query(`SELECT * FROM ??`, table, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message })
    } else {
      res.send(result)
    }
  })
})

router.get('/:id', async (req, res) => {
  const table = req.baseUrl.slice(1)
  const column = table + '_id'
  const id = req.params.id

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

router.post('/', async (req, res) => {
  const table = req.baseUrl.slice(1)

  // if (req.body.password) {
  //   req.body.password = bcrypt.hashSync(req.body.password, 10)
  // }

  const columns = Object.keys(req.body)
  const values = Object.values(req.body)

  db.query(
    `INSERT INTO ?? (??) VALUES (?)`,
    [table, columns, values],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.json({ message: 'Added entry', id: result.insertId })
      }
    }
  )
})

const isNumeric = (str) => {
  if (typeof str != 'string') return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

router.patch('/:id', async (req, res) => {
  const table = req.baseUrl.slice(1)
  const column = table + '_id'
  const id = req.params.id

  // if (req.body.parole) {
  //   req.body.parole = bcrypt.hashSync(req.body.parole, 10)
  // }

  const columns = Object.keys(req.body)
  const columnSetters = Object.keys(req.body)
    .map(() => '?? = ?')
    .join(', ')

  const values = Object.values(req.body).map((value) =>
    !isNumeric(value) && moment(value, moment.ISO_8601, true).isValid()
      ? moment(value).format('YYYY-MM-DD HH:mm:ss')
      : value && (value.constructor === Array || typeof value === 'object')
      ? JSON.stringify(value)
      : value
  )

  db.query(
    `UPDATE ?? SET ${columnSetters} WHERE ?? = ?`,
    [table, ...columns, ...values, column, id],
    (err) => {
      if (err) {
        res.status(500).json({ message: err.message })
      } else {
        res.json({ message: 'Updated entry: ' + id })
      }
    }
  )
})

router.delete('/:id', async (req, res) => {
  const table = req.baseUrl.slice(1)
  const column = table + '_id'
  const id = req.params.id

  db.query(`DELETE FROM ?? WHERE ?? = ?`, [table, column, id], (err) => {
    if (err) {
      res.status(500).json({ message: err.message })
    } else {
      res.json({ message: 'Deleted entry: ' + id })
    }
  })
})

export default router
