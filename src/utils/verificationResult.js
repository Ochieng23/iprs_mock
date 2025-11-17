function normalize(value, type = 'string') {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (type === 'date') {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return undefined;
    }
    return parsed.toISOString().split('T')[0];
  }

  if (typeof value === 'string') {
    if (type === 'string') {
      return value.trim().toLowerCase();
    }
    return value.trim();
  }

  return String(value).trim().toLowerCase();
}

function compareFields(record, payload, comparators) {
  const mismatches = [];
  const checkedFields = [];

  comparators.forEach((comparator) => {
    const {
      payloadField,
      recordField = payloadField,
      label = payloadField,
      type = 'string'
    } = comparator;

    if (!(payloadField in payload)) {
      return;
    }

    const payloadValue = normalize(payload[payloadField], type);
    if (payloadValue === undefined) {
      return;
    }

    checkedFields.push(label);
    const officialValue = normalize(record?.[recordField], type);
    if (officialValue === undefined || officialValue !== payloadValue) {
      mismatches.push({
        field: label,
        provided: payload[payloadField],
        official: record?.[recordField] ?? null
      });
    }
  });

  return { mismatches, checkedFields };
}

function buildVerificationResponse({
  record,
  payload,
  comparators,
  identifierField,
  identifierLabel
}) {
  if (!record) {
    return {
      exists: false,
      match: false,
      checkedFields: [],
      mismatches: [],
      identifier: payload[identifierField],
      identifierLabel,
      officialRecord: null
    };
  }

  const { mismatches, checkedFields } = compareFields(
    record,
    payload,
    comparators
  );

  return {
    exists: true,
    match: mismatches.length === 0,
    checkedFields,
    mismatches,
    identifier: record[identifierField],
    identifierLabel,
    officialRecord: record
  };
}

module.exports = { buildVerificationResponse };
