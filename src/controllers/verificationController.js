const verificationService = require('../services/verificationService');

async function handleVerification(serviceFn, req, res, next) {
  try {
    const result = await serviceFn(req.validatedBody || req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

function verifyNationalId(req, res, next) {
  return handleVerification(verificationService.verifyNationalId, req, res, next);
}

function verifyPassport(req, res, next) {
  return handleVerification(verificationService.verifyPassport, req, res, next);
}

function verifyBirthCertificate(req, res, next) {
  return handleVerification(
    verificationService.verifyBirthCertificate,
    req,
    res,
    next
  );
}

function verifyDeathRecord(req, res, next) {
  return handleVerification(verificationService.verifyDeathRecord, req, res, next);
}

function verifyAlienRegistration(req, res, next) {
  return handleVerification(
    verificationService.verifyAlienRegistration,
    req,
    res,
    next
  );
}

module.exports = {
  verifyNationalId,
  verifyPassport,
  verifyBirthCertificate,
  verifyDeathRecord,
  verifyAlienRegistration
};
