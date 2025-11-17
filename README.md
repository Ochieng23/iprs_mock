## IPRS Clone (Node.js + MongoDB)

This project is a lightweight clone of the Kenyan Integrated Population Registration System (IPRS). It exposes verification APIs for identity artifacts commonly checked by IPRS:

- National ID
- Passport
- Birth certificate
- Death record
- Alien/foreigner registration

The API accepts a record identifier plus optional fields to cross-check, retrieves the official record from MongoDB, and tells you whether the supplied fields match what government registries contain.

---

### Prerequisites

- Node.js 18+
- MongoDB instance you can connect to

---

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Add environment config**
   ```bash
   cp .env.example .env
   # Adjust `MONGO_URI` if needed
   ```
3. **Seed sample records** (creates realistic fixtures for each document type)
   ```bash
   npm run seed
   ```
4. **Start the API**
   ```bash
   npm run dev  # or `npm start`
   ```
5. Hit `http://localhost:4000/health` to confirm the service is running.

---

### API Overview

All endpoints are `POST` requests under `/api/verify`. Request bodies accept the identifier plus the fields you want to check. Only the identifier is required; every other field is optional and will only be evaluated if provided.

Responses share the same shape:

```json
{
  "exists": true,
  "match": false,
  "checkedFields": ["First name", "Date of birth"],
  "mismatches": [
    { "field": "Date of birth", "provided": "1995-01-01", "official": "1990-04-14T00:00:00.000Z" }
  ],
  "identifier": "12345678",
  "identifierLabel": "National ID number",
  "officialRecord": {
    "...": "Official data pulled from MongoDB"
  }
}
```

| Endpoint | Required Identifier | Verifiable Attributes |
| --- | --- | --- |
| `POST /api/verify/national-id` | `idNumber` | First/Middle/Surname, gender, date of birth, citizenship status, issuance date |
| `POST /api/verify/passport` | `passportNumber` | Names, nationality, date of birth, issuance / expiry dates |
| `POST /api/verify/birth-certificate` | `certificateNumber` | Child names, date/place of birth, parents' names |
| `POST /api/verify/death-record` | `idNumber` | Names, date of death, registration number, place of death |
| `POST /api/verify/alien-registration` | `alienId` | Names, nationality, permit category, validity dates |

---

### Sample Request

```bash
curl --request POST http://localhost:4000/api/verify/national-id \
  --header "Content-Type: application/json" \
  --data '{
    "idNumber": "12345678",
    "firstName": "Amina",
    "dateOfBirth": "1990-04-14"
  }'
```

Result (with the seed data):

```json
{
  "exists": true,
  "match": true,
  "checkedFields": ["First name", "Date of birth"],
  "mismatches": [],
  "identifier": "12345678",
  "identifierLabel": "National ID number",
  "officialRecord": {
    "idNumber": "12345678",
    "firstName": "Amina",
    "middleName": "Wanjiru",
    "surname": "Omondi",
    "gender": "Female",
    "dateOfBirth": "1990-04-14T00:00:00.000Z",
    "citizenshipStatus": "Citizen",
    "issuanceDate": "2008-09-20T00:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### Project Structure

```
src/
  app.js                Express configuration
  server.js             Bootstraps the server + DB connection
  config/               Environment & Mongo connection helpers
  controllers/          Route handlers
  services/             Verification logic for each artifact
  models/               Mongoose schemas
  routes/               REST routes + validation schemas
  middleware/           Request validation helper
  scripts/seed.js       Seeds MongoDB with demo data
```

---

### Next Steps

- Replace the seed data with actual registry dumps or integrate data ingestion pipelines.
- Layer authentication/authorization (e.g., API keys or OAuth) before exposing the service publicly.
- Add audit logging + request rate limiting.
- Extend verification responses with scoring/confidence models if desired.
# iprs_mock
