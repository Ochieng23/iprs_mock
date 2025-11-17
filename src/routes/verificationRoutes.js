const express = require('express');
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');
const controller = require('../controllers/verificationController');

const router = express.Router();

const nationalIdSchema = Joi.object({
  idNumber: Joi.string().trim().required(),
  firstName: Joi.string().trim(),
  middleName: Joi.string().trim(),
  surname: Joi.string().trim(),
  gender: Joi.string().trim(),
  dateOfBirth: Joi.date(),
  citizenshipStatus: Joi.string().trim(),
  issuanceDate: Joi.date()
});

const passportSchema = Joi.object({
  passportNumber: Joi.string().trim().required(),
  firstName: Joi.string().trim(),
  middleName: Joi.string().trim(),
  surname: Joi.string().trim(),
  nationality: Joi.string().trim(),
  dateOfBirth: Joi.date(),
  issuedOn: Joi.date(),
  expiresOn: Joi.date()
});

const birthCertificateSchema = Joi.object({
  certificateNumber: Joi.string().trim().required(),
  firstName: Joi.string().trim(),
  middleName: Joi.string().trim(),
  surname: Joi.string().trim(),
  dateOfBirth: Joi.date(),
  placeOfBirth: Joi.string().trim(),
  motherName: Joi.string().trim(),
  fatherName: Joi.string().trim()
});

const deathRecordSchema = Joi.object({
  idNumber: Joi.string().trim().required(),
  firstName: Joi.string().trim(),
  middleName: Joi.string().trim(),
  surname: Joi.string().trim(),
  dateOfDeath: Joi.date(),
  deathRegistrationNumber: Joi.string().trim(),
  placeOfDeath: Joi.string().trim()
});

const alienRegistrationSchema = Joi.object({
  alienId: Joi.string().trim().required(),
  firstName: Joi.string().trim(),
  middleName: Joi.string().trim(),
  surname: Joi.string().trim(),
  nationality: Joi.string().trim(),
  permitCategory: Joi.string().trim(),
  permitIssueDate: Joi.date(),
  permitExpiryDate: Joi.date()
});

router.post(
  '/national-id',
  validateRequest(nationalIdSchema),
  controller.verifyNationalId
);

router.post(
  '/passport',
  validateRequest(passportSchema),
  controller.verifyPassport
);

router.post(
  '/birth-certificate',
  validateRequest(birthCertificateSchema),
  controller.verifyBirthCertificate
);

router.post(
  '/death-record',
  validateRequest(deathRecordSchema),
  controller.verifyDeathRecord
);

router.post(
  '/alien-registration',
  validateRequest(alienRegistrationSchema),
  controller.verifyAlienRegistration
);

module.exports = router;
