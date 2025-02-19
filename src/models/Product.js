const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const proSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
},
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  
});

proSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Product", proSchema);
