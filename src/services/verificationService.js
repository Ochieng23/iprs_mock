const NationalIdRecord = require('../models/NationalIdRecord');
const PassportRecord = require('../models/PassportRecord');
const BirthCertificateRecord = require('../models/BirthCertificateRecord');
const DeathRecord = require('../models/DeathRecord');
const AlienRegistrationRecord = require('../models/AlienRegistrationRecord');
const { buildVerificationResponse } = require('../utils/verificationResult');

async function verifyNationalId(payload) {
  const record = await NationalIdRecord.findOne({
    idNumber: payload.idNumber
  }).lean();

  return buildVerificationResponse({
    record,
    payload,
    identifierField: 'idNumber',
    identifierLabel: 'National ID number',
    comparators: [
      { payloadField: 'firstName', label: 'First name' },
      { payloadField: 'middleName', label: 'Middle name' },
      { payloadField: 'surname', label: 'Surname' },
      { payloadField: 'gender', label: 'Gender' },
      { payloadField: 'dateOfBirth', label: 'Date of birth', type: 'date' },
      {
        payloadField: 'citizenshipStatus',
        label: 'Citizenship status'
      },
      { payloadField: 'issuanceDate', label: 'ID issuance date', type: 'date' }
    ]
  });
}

async function verifyPassport(payload) {
  const record = await PassportRecord.findOne({
    passportNumber: payload.passportNumber
  }).lean();

  return buildVerificationResponse({
    record,
    payload,
    identifierField: 'passportNumber',
    identifierLabel: 'Passport number',
    comparators: [
      { payloadField: 'firstName', label: 'First name' },
      { payloadField: 'middleName', label: 'Middle name' },
      { payloadField: 'surname', label: 'Surname' },
      { payloadField: 'nationality', label: 'Nationality' },
      { payloadField: 'dateOfBirth', label: 'Date of birth', type: 'date' },
      { payloadField: 'issuedOn', label: 'Issued on', type: 'date' },
      { payloadField: 'expiresOn', label: 'Expires on', type: 'date' }
    ]
  });
}

async function verifyBirthCertificate(payload) {
  const record = await BirthCertificateRecord.findOne({
    certificateNumber: payload.certificateNumber
  }).lean();

  return buildVerificationResponse({
    record,
    payload,
    identifierField: 'certificateNumber',
    identifierLabel: 'Birth certificate number',
    comparators: [
      { payloadField: 'firstName', label: 'Child first name' },
      { payloadField: 'middleName', label: 'Child middle name' },
      { payloadField: 'surname', label: 'Child surname' },
      { payloadField: 'dateOfBirth', label: 'Date of birth', type: 'date' },
      { payloadField: 'placeOfBirth', label: 'Place of birth' },
      { payloadField: 'motherName', label: 'Mother name' },
      { payloadField: 'fatherName', label: 'Father name' }
    ]
  });
}

async function verifyDeathRecord(payload) {
  const record = await DeathRecord.findOne({
    idNumber: payload.idNumber
  }).lean();

  return buildVerificationResponse({
    record,
    payload,
    identifierField: 'idNumber',
    identifierLabel: 'National ID number',
    comparators: [
      { payloadField: 'firstName', label: 'First name' },
      { payloadField: 'middleName', label: 'Middle name' },
      { payloadField: 'surname', label: 'Surname' },
      { payloadField: 'dateOfDeath', label: 'Date of death', type: 'date' },
      {
        payloadField: 'deathRegistrationNumber',
        label: 'Death registration number'
      },
      { payloadField: 'placeOfDeath', label: 'Place of death' }
    ]
  });
}

async function verifyAlienRegistration(payload) {
  const record = await AlienRegistrationRecord.findOne({
    alienId: payload.alienId
  }).lean();

  return buildVerificationResponse({
    record,
    payload,
    identifierField: 'alienId',
    identifierLabel: 'Alien registration ID',
    comparators: [
      { payloadField: 'firstName', label: 'First name' },
      { payloadField: 'middleName', label: 'Middle name' },
      { payloadField: 'surname', label: 'Surname' },
      { payloadField: 'nationality', label: 'Nationality' },
      { payloadField: 'permitCategory', label: 'Permit category' },
      { payloadField: 'permitIssueDate', label: 'Permit issue date', type: 'date' },
      { payloadField: 'permitExpiryDate', label: 'Permit expiry date', type: 'date' }
    ]
  });
}

module.exports = {
  verifyNationalId,
  verifyPassport,
  verifyBirthCertificate,
  verifyDeathRecord,
  verifyAlienRegistration
};
