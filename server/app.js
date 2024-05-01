const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require('cookie-parser')
//eyaldfs
require("dotenv").config();
require("./database/mongo")();

app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:["http://localhost:5173"],
    optionsSuccessStatus:200
}));

//import routers
const user_router = require("./routers/user_router");
const product_router = require("./routers/product_router");
const category_router = require("./routers/categories_router");

//use routers with path
app.use("/users",user_router)
app.use("/products",product_router)
app.use("/categories",category_router)

const port = process.env.PORT

app.listen(port,() => console.log(`server is running on port ${port}`))