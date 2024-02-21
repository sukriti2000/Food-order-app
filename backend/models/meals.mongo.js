const mongoose = require('mongoose');

const mealsSchema= new mongoose.Schema({
    id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: String,
        match: /^\d+(\.\d{1,2})?$/,  // Pattern for a string representing a decimal number with up to 2 decimal places
        required: true
      },
      description: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    });
    
    module.exports = mongoose.model('Meals', mealsSchema);

    