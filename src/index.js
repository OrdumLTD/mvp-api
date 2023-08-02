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


// const Proposal = require('./models/proposal/proposal')
// const Organization = require('./models/users/organization');
// const User = require("./models/user");

// const main = async () => {
//   // const proposal =  await Proposal.findById('64c9b46ff236eb223e3edaf2')
//   // await proposal.populate('owner')
//   // console.log(proposal)

//   const organization = await Organization.findById('64c9b2304078b3c1d3723b57')
//   await organization.populate('proposals')
//   await organization.getPublicProfile()
//   console.log(organization.proposals)
// }

// main()