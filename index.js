const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require ("./src/routes/user");
const productRoutes = require ("./src/routes/product");



const port = process.env.PORT || 4200;

const allowedOrigins = ['https://marvalenstores.web.app', 'http://localhost:4200'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, origin); // Permitir el origen
    } else {
      callback(new Error('No permitido por CORS')); // Bloquear el origen
    }
  },
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type,Authorization' // Encabezados permitidos
}));

//routes
app.get("/", (req, res) => {
  res.send("Bienvenido a MarvalensStore-api");
});


//middleware
app.use(express.json());
app.use('', userRoutes)
app.use('', productRoutes)

//mongobd connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión a la Base de datos exitosa"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("server listening on port", port));
