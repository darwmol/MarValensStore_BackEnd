const express = require("express");
const proSchema = require("../models/Product");
const Product = require('../models/Product');
const router = express.Router();

// create product
router.post("/products", (req, res) => {
  const product = proSchema(req.body);
  product
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all products
router.get("/products", (req, res) => {
  proSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    console.log('Buscando producto con ID:', id); 
    const product = await Product.findOne({ id: id });
    console.log('Producto encontrado:', product); 

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const { _id, ...resto } = product.toObject();
    res.json({ id: _id.toString(), ...resto });
  } catch (error) {
    console.error('Error al buscar el producto:', error); // Imprime el error en la consola
    res.status(500).send('Error en el servidor');
  }
});

// delete a product
router.delete("/products/:id", (req, res) => {  
  const { id } = req.params;
  proSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a product
router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, description, image } = req.body;
  proSchema
    .updateOne({ _id: id }, { $set: { title, price, description, image } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
module.exports = router;
