const { Schema, model } = require('mongoose');

const deathRecordSchema = new Schema(
  {
    idNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    surname: { type: String, required: true },
    dateOfDeath: { type: Date, required: true },
    deathRegistrationNumber: { type: String, required: true },
    placeOfDeath: { type: String }
  },
  { timestamps: true }
);

module.exports = model('DeathRecord', deathRecordSchema);
