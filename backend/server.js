const express = require("express");
const dotenv = require("dotenv");
const usersRoute = require("./routes/usersRoute");
const error = require("./middlewares/errorMiddlewareHandler");
const bookRouter = require("./routes/bookRoutes");

dotenv.config();
require("./config/dbConnect")();

const app = express();

//Passing body data
app.use(express.json());

//routes
//users
app.use("/api/users", usersRoute);
//books
app.use("/api/books", bookRouter);

console.log(process.env.MY_NAME);
//Error middleware
app.use(error.errorMiddlewareHandler);

//server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is up and running ${PORT}`);
});
