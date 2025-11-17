const { Schema, model } = require('mongoose');

const alienRegistrationSchema = new Schema(
  {
    alienId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    surname: { type: String, required: true },
    nationality: { type: String, required: true },
    permitCategory: { type: String, required: true },
    permitIssueDate: { type: Date, required: true },
    permitExpiryDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = model('AlienRegistrationRecord', alienRegistrationSchema);
