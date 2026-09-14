# CareFlow AI — real-system prototype

CareFlow AI is a React/Vite frontend plus a Node/Express/MongoDB API.

## Included
- MongoDB-backed doctor and appointment data.
- Seeded Chennai and Trichy hospital/doctor demo dataset.
- Slot conflict protection when two patients try to book the same slot.
- Appointment cancellation workflow.
- WhatsApp Cloud API adapter for booking/cancellation notifications.
- Image upload + vision-provider adapter for broad healthcare navigation (never a diagnosis).
- English, Telugu, Hindi and Tamil local NLP-style symptom routing.
- Low-literacy-friendly large actions and voice-input UI.
- Doctor data refreshes every 10 seconds for near-real-time availability changes.

## Important data note
Hospital names are real public hospital names in Chennai/Trichy. Doctor profiles and phone numbers in the seed are synthetic demo records and must be replaced/verified before production use.

## Run frontend
```powershell
cd ".\care flow ai"
npm.cmd install
npm.cmd run dev
```

## Run API
Open a second PowerShell window:
```powershell
cd ".\care flow ai\server"
copy .env.example .env
npm.cmd install
node index.js
```

Set `MONGODB_URI` in `server/.env` to MongoDB Atlas or local MongoDB. The API seeds doctors automatically on an empty database.

## WhatsApp
Automatic WhatsApp delivery requires a Meta WhatsApp Cloud API access token and phone-number ID in `server/.env`. Without them, the API returns a clear not-configured status instead of pretending a message was sent.

## Image AI
Set `VISION_API_KEY` (and optionally `VISION_API_URL`/`VISION_MODEL`) in `server/.env` to enable vision analysis. Without a vision key, image upload still works but the system will not invent a medical result.
