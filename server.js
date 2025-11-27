const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Routes
app.use("/", require("./routes"));


// error handlers
// This catches any request that didn’t match a defined route.
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// This catches any thrown errors or errors passed to next(err).
app.use((err, req, res, next) => {
  console.error(err.stack); // log error
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and Node is running on port ${port}`);
    });
  }
});
