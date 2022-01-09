const express = require('express')
const { Pool } = require('pg');

const app = express()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>')
})

app.get('/dbcreate', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('create table message_table (id integer, content text)');
    console.log(result);
    // const results = { 'results': (result) ? result.rows : null};
    // res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));