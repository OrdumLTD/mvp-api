const express = require("express");
var cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/user");
const organizationRouter = require("./routers/organization");
const proposalRouter = require("./routers/proposal")

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(userRouter);
app.use(organizationRouter);
app.use(proposalRouter)


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

