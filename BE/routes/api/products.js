const router = require('express').Router();
const sql = require("mssql/msnodesqlv8");
const config = require("../../config/db");

router.get("/view", async (req, res) => {
  try {

    await sql.connect(config);
    const result = await sql.query("SELECT * FROM [e-commerce].[dbo].[product_table]");
    res.send({
        data: result.recordset
    })
  } catch(err)
  {
      res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    await sql.connect(config);
    const result = await sql.query(`SELECT * FROM [e-commerce].[dbo].[product_table] where id = '${id}'`);
    res.send({
        data: result.recordset
    })
  } catch(err)
  {
      res.send(err);
  }
});




module.exports = router;