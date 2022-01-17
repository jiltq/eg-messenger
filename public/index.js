import { Pool } from '../node_modules/pg/lib/index.js';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

window.uploadMessage = async function uploadMessage(msg) {
    try {
        const client = await pool.connect();
        const result = await client.query(`insert into message_table values (${Math.random().toString()}, ${msg})`);
        console.log(result);
        /*
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/db', results );
        */
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
}