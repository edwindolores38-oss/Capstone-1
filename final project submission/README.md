# LocalLens (Next.js) — Step 6 Full Build

This repo is a **fully runnable Next.js full-stack implementation** of LocalLens, built to satisfy Step 6 requirements (build, test, deploy, document)【98†source】.

## Requirements Coverage
- Next.js project scaffold and structure ✅
- MongoDB CRUD via Next.js API routes ✅
- REST API with JWT auth ✅
- UI components and pages ✅
- Global state via Context API ✅
- Tailwind styling ✅
- Tests (Jest + React Testing Library) ✅
- Deploy to Render or similar ✅
- Documentation (this README + .env.example) ✅

## Getting Started
```bash
cp .env.example .env
npm install
npm run dev
```
App runs at http://localhost:3000

### MongoDB
Default `.env` uses local MongoDB: `mongodb://localhost:27017/locallens`.
Use Atlas by replacing `MONGODB_URI` with your cloud URI.

## Seeding Data
Use the UI to create events via POST `/api/events` (the Events page consumes queries). 
Alternatively edit the database directly with your preferred tool.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — build production
- `npm start` — start production
- `npm test` — run tests

## Testing
- Unit: token sign/verify in `tests/auth.test.js`
- Component: renders Home and calls events endpoint (mocked)

## Deployment
- Create environment variables on Render (or Vercel): `MONGODB_URI`, `JWT_SECRET`
- Build command: `npm install && npm run build`
- Start command: `npm start`

## API
- `POST /api/auth/register` — {name,email,password} -> {token}
- `POST /api/auth/login` — {email,password} -> {token}
- `GET /api/auth/me` — Authorization: Bearer <token>
- `GET /api/events` — list with filters
- `POST /api/events` — upsert event
- `GET /api/events/[eventId]` — detail
- `PUT /api/events/[eventId]` — update
- `DELETE /api/events/[eventId]` — delete
- `GET|POST|DELETE /api/users/favorites` — favorites management

## Submission
- Commit to GitHub, open PR from `dev` to `main` without merging, as per instructions【98†source】.
