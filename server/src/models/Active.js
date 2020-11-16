const mongoose = require('mongoose');

const ActiveSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    description: String,
    model: String,
    responsible: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['available', 'inMaintenance', 'disable'],
      default: 'available',
    },
    healthscore: Number,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

ActiveSchema.virtual('imageUrl').get(function () {
  return `https://tractian-challenge-fullstack.herokuapp.com/files/${this.image}`;
});

module.exports = mongoose.model('Active', ActiveSchema);
