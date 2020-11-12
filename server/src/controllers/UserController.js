const User = require('../models/User');
const Company = require('../models/Company');

module.exports = {
  async store(req, res) {
    const { name, email } = req.body;
    const { companyId } = req.params;

    let user = await User.create({ name, email });

    let company = await Company.findById(companyId);
    company.employees.push(user);
    company.save();

    return res.status(201).json(user);
  },
};
