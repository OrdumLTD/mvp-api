const express = require("express");
var cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/user");
const organizationRouter = require("./routers/organization");
const proposalRouter = require("./routers/proposal")
const taskRouter = require("./routers/task")
const milstoneRouter = require("./routers/milestone")

const app = express();
const port = process.env.PORT || 3000;


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


const Proposal = require('./models/proposal/proposal')
const Milestone = require('./models/milestones/milestone')
const Organization = require('./models/users/organization');
// const User = require("./models/user");

const main = async () => {
  // const proposal =  await Proposal.findById('64c9b46ff236eb223e3edaf2')
  // await proposal.populate('owner')
  // console.log(proposal)

  const proposal = await Proposal.findById('64ca0f13a455b9c4fa7a05ce')
  await proposal.populate('milestones')
  // await organization.getPublicProfile()
  console.log(proposal.milestones[1].tasks[1])
  
}

main()