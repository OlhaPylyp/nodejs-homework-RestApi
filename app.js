// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// require("dotenv").config();
// const contactsRouter = require("./src/routes/api/contactsRouter");

// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());
// app.use(express.static("build"));
// app.use("/api/cont", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
const { errorHandler } = require("./src/helpers/apiHelpers");
const contactsRouter = require("./src/routes/api/contactsRouter");
const app = express();

// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());
app.use("/api/cont", contactsRouter);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(errorHandler);

module.exports = app;
