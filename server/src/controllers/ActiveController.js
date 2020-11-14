const Active = require('../models/Active');
const { update } = require('../models/Unit');
const Unit = require('../models/Unit');

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const {
      name,
      description,
      model,
      responsible,
      status,
      healthscore,
    } = req.body;

    const { unitId } = req.params;

    let active = await Active.create({
      image: filename,
      name,
      description,
      status,
      model,
      healthscore,
      responsible,
    });

    let unit = await Unit.findById(unitId);
    unit.active.push(active);
    unit.save();

    return res.status(201).json(active);
  },

  async update(req, res) {
    const { activeId } = req.params;

    let active = await Active.findById(activeId);
    await active.updateOne(req.body);

    return res.send();
  },
};