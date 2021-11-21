const express = require("express");
const cors = require("cors");
require("dotenv").config();

//routers
const postsRouter = require("./routers/routes/posts");
const usersRouter = require("./routers/routes/users");
const trendsRouter = require("./routers/routes/trending");
//  const authRouter = require("./routers/routes/auth/login");


const app = express();

//built-in middleware
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/trends", trendsRouter);
// app.use(authRouter);

// //Page not found 404 handler
 app.use("*", (req, res) => res.status(404).json("NO content at this path"));

 module.exports = app;