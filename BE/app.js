const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

var _product = require("./routes/api/products");
var _images = require("./routes/api/images");
app.use("/product",_product);
app.use("/image",_images);


app.listen(4000, () =>{
    console.log("Server is Listening to Port 4000")
});