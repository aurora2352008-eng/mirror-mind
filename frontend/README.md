# Mirror Mind (frontend prototype)
`npm install && npm run dev`. All data is mocked in `src/data/`; profile shape is in `src/utils/profile.js`.
To connect FastAPI later, replace `buildProfile` (POST /profile), the `mockDecision` imports (POST /decisions/analyze), and the `onGoal`/`onPattern` handlers in `App.jsx` (PATCH /profile).
