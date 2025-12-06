const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Movie Review API",
    description: "API for Movies, Genres, Users and Reviews",
  },
  host: "https://cse341-project-2-fn1v.onrender.com/",
  schemes: ["https", "http"],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);