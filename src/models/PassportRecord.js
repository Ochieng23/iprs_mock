const { Schema, model } = require('mongoose');

const passportRecordSchema = new Schema(
  {
    passportNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    surname: { type: String, required: true },
    nationality: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    issuedOn: { type: Date, required: true },
    expiresOn: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = model('PassportRecord', passportRecordSchema);
