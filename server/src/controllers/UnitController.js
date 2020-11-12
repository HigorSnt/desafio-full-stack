const Unit = require('../models/Unit');
const Company = require('../models/Company');

module.exports = {
  async store(req, res) {
    const { name, active = [] } = req.body;
    const { companyId } = req.params;

    let unit = await Unit.create({ name, active });

    let company = await Company.findById(companyId);
    company.units.push(unit);
    company.save();

    return res.status(201).json(unit);
  },
};
