const { Schema, model } = require('mongoose');

const birthCertificateSchema = new Schema(
  {
    certificateNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    surname: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    motherName: { type: String, required: true },
    fatherName: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = model('BirthCertificateRecord', birthCertificateSchema);
