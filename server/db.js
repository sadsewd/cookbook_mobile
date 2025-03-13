import mysql from 'mysql2'

const db = mysql.createConnection({
  user: process.env.MYSQLUSER || 'admin',
  host: process.env.MYSQLHOST || 'localhost',
  password: process.env.MYSQLPASSWORD || 'Parole123',
  database: process.env.MYSQLDATABASE || 'cookbook',
  port: process.env.MYSQLPORT || '3306',
})

db.connect((err) => {
  if (err) throw err
  console.log('MySQL connected')
})

export default db
