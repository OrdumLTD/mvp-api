const express = require("express");
var cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/user");
const organizationRouter = require("./routers/organization");
const proposalRouter = require("./routers/proposal")
const taskRouter = require("./routers/task")
const milstoneRouter = require("./routers/milestone")

const app = express();
const port = process.env.MONGODI_URI || 3000;


app.use(express.json());
app.use(userRouter);
app.use(milstoneRouter);
app.use(organizationRouter);
app.use(proposalRouter)
app.use(taskRouter)


// Used for local testing
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});