const express = require("express");
const logger = require("./middleware/logger");

const accountsRouter = require('./accounts/accountsRouter');

//const server = require("./api/server.js");

const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use("/", accountsRouter);

//server.use(logger);

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
