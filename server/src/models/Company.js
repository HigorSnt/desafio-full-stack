const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  units: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
    },
  ],
});

module.exports = mongoose.model('Company', CompanySchema);
