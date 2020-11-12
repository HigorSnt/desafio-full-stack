const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
  name: String,
  active: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Active',
    },
  ],
});

module.exports = mongoose.model('Unit', UnitSchema);
