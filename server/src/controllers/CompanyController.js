const Company = require('../models/Company');

module.exports = {
  async store(req, res) {
    const { name, employees = [], units = [] } = req.body;

    let company = await Company.create({ name, employees, units });

    return res.status(201).send(company);
  },

  async getEmployees(req, res) {
    const { companyId } = req.params;

    let company = await Company.findById(companyId);
    await company.populate('employees').execPopulate();

    return res.json(company.employees);
  },

  async show(req, res) {
    const { companyId } = req.params;

    let company = await Company.findById(companyId);

    await company.populate('employees').execPopulate();
    await company.populate('units').execPopulate();
    await company.populate('units.active').execPopulate();
    await company.populate('units.active.responsible').execPopulate();

    return res.json(company);
  },
};
