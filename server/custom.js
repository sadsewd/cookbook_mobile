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
      req.user = user
      next()
    }
  })
}

router.get('/userRecipes', authenticateSession, async (req, res) => {
  const id = req.user.id

  db.query(`SELECT * FROM recipes WHERE users_id = ?`, id, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message })
    } else {
      res.json(result)
    }
  })
})

// router.get('/recipe/:id', authenticateSession, async (req, res) => {
//   db.query(
//     `SELECT * FROM recipes WHERE recipes_id = ?`,
//     req.params.id,
//     (err, recipe) => {
//       if (err) {
//         res.status(500).json({ message: err.message })
//       } else {
//         db.query(
//           `SELECT * FROM ingredients WHERE recipes_id = ?`,
//           req.params.id,
//           (err, ingredients) => {
//             if (err) {
//               res.status(500).json({ message: err.message })
//             } else {
//               db.query(
//                 `SELECT * FROM steps WHERE recipes_id = ? ORDER BY sequence`,
//                 req.params.id,
//                 (err, steps) => {
//                   if (err) {
//                     res.status(500).json({ message: err.message })
//                   } else {
//                     res.json({
//                       recipe: recipe[0],
//                       ingredients,
//                       steps,
//                     })
//                   }
//                 }
//               )
//             }
//           }
//         )
//       }
//     }
//   )
// })

router.get('/recipe/:id', authenticateSession, async (req, res) => {
  try {
    const recipeId = req.params.id
    const userId = req.user.id

    const [recipe] = await db
      .promise()
      .query(`SELECT * FROM recipes WHERE recipes_id = ? AND users_id = ?`, [
        recipeId,
        userId,
      ])
    if (recipe.length === 0)
      return res.status(404).json({ message: 'Recipe not found' })

    const [ingredients] = await db
      .promise()
      .query(`SELECT * FROM ingredients WHERE recipes_id = ?`, [recipeId])
    const [steps] = await db
      .promise()
      .query(`SELECT * FROM steps WHERE recipes_id = ? ORDER BY sequence`, [
        recipeId,
      ])

    res.json({
      recipe: recipe[0],
      ingredients,
      steps,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
