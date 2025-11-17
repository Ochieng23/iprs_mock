const { Schema, model } = require('mongoose');

const nationalIdSchema = new Schema(
  {
    idNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    surname: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date, required: true },
    citizenshipStatus: { type: String, required: true },
    issuanceDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = model('NationalIdRecord', nationalIdSchema);
