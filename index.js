const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const path = require("path");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

const PORT = process.env.PORT || 5000;

//query parameter => http://localhost:5000/?search=grow your = req.query

app.get("/", async (req, res) => {

  try {
    const { search } = req.query;

    var words = search.split(" ");
    
    for(let i = 0; i < words.length; i++)
        {
          await pool.query(
            `INSERT INTO PARTIALS (id, keyword)
             SELECT id ,keyword FROM ${process.env.TABLE}
             WHERE keyword ILIKE $1
             ORDER BY id `,
             [`%${words[i]}%`]
          )
        }

    await pool.query(
      `INSERT INTO COMPLETE(id, keyword)
       SELECT DISTINCT id ,keyword 
       FROM PARTIALS
       WHERE keyword ILIKE $1
       ORDER BY id`,
      [`%${search}%`]
    );
    
    const completeres = await pool.query(`SELECT id, keyword FROM COMPLETE`);
    const complete_matches = completeres.rows;
    
    const partialres = await pool.query(
      `SELECT id, keyword
      FROM PARTIALS
      EXCEPT
      SELECT id, keyword
      FROM COMPLETE
      ORDER BY id`
    );


    const partial_matches = partialres.rows;

    await pool.query(`DELETE FROM COMPLETE`)
    await pool.query(`DELETE FROM PARTIALS`)

    res.json({
      partial_matches: partial_matches,
      complete_matches: complete_matches
    });

  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log("Server is starting on port 5000");
});
