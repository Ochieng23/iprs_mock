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
   
   npm install
   
2. **Add environment config**
   ```bash
   cp .env.example .env
   # Set `API_KEY` (required) and adjust `MONGO_URI` if needed
   npm run keygen  # optional helper to print a secure API key
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

### Authentication

All `/api/verify/*` routes require an API key supplied via the `x-api-key` header. Set the `API_KEY` value in your `.env` (or export it in your shell) and use the same value whenever you call the API.

```bash
API_KEY=super-secret-string npm run dev
# or export API_KEY=super-secret-string before starting the server
# generate a fresh key any time with: npm run keygen
```

Requests sent without the correct header will be rejected with `401 Invalid or missing API key`.

---

### Sample Request

```bash
curl --request POST http://localhost:4000/api/verify/national-id \
  --header "Content-Type: application/json" \
  --header "x-api-key: $API_KEY" \
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

### Postman Samples

Import the collection at `postman/IPRS_Verification_API.postman_collection.json` plus the companion environment file `postman/IPRS_Local.postman_environment.json`. Update the environment's `apiKey` variable so the saved requests automatically attach the `x-api-key` header.

---

### Endpoint Payloads (ready for Postman)

Use these JSON bodies (all derived from the seeded fixtures) when invoking the API via Postman or curl:

- **POST `/api/verify/national-id`**

  ```json
  {
    "idNumber": "21234567",
    "firstName": "Mary",
    "surname": "Kimani",
    "gender": "Female",
    "citizenshipStatus": "Citizen"
  }
  ```

- **POST `/api/verify/passport`**

  ```json
  {
    "passportNumber": "CK012345",
    "firstName": "Mary",
    "surname": "Kimani",
    "nationality": "Kenyan",
    "issuedOn": "2022-01-14"
  }
  ```

- **POST `/api/verify/birth-certificate`**

  ```json
  {
    "certificateNumber": "BC-2017-015",
    "firstName": "Leah",
    "placeOfBirth": "Nairobi Hospital",
    "motherName": "Amina Wanjiru Omondi",
    "fatherName": "Samuel Otieno Omondi"
  }
  ```

- **POST `/api/verify/death-record`**

  ```json
  {
    "idNumber": "33445566",
    "firstName": "Margaret",
    "surname": "Odhiambo",
    "placeOfDeath": "Kisumu County Hospital",
    "deathRegistrationNumber": "DRN-2021-778"
  }
  ```

- **POST `/api/verify/alien-registration`**

  ```json
  {
    "alienId": "ALN-0007",
    "firstName": "Samuel",
    "surname": "Mensah",
    "nationality": "Ghanaian",
    "permitCategory": "Work Permit - Class D"
  }
  ```

Copy a payload, set the `x-api-key` header, and send to the corresponding endpoint to confirm the service is functioning.

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
