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

  async show(req, res) {
    const { unitId } = req.params;

    let unit = await Unit.findById(unitId);
    unit = await Unit.populate(unit, 'active');
    unit = await Unit.populate(unit, 'active.responsible');

    return res.json(unit);
  },
};
