# Direct AI backend

The application no longer calls workflowly.online. Promise reflections, scripture trivia, Old Testament reflections, Marian apparition narration, memory coaching, and miracle narration now call Groq from the application's Next.js server. Editorial prompts are versioned in `app/lib/prompts.json`; the existing JSON content remains in place. Historical workflow exports are retained for reference only.

## Vercel deployment

The existing `viasancta` Vercel project serves divinepilgrim.com. No hosting or domain move is required.

Set `GROQ_API_KEY` privately in each environment that will be tested or deployed. Optional `GROQ_MODEL` defaults to `llama-3.3-70b-versatile`.

Speech uses `AZURE_SPEECH_KEY` and `AZURE_SPEECH_REGION`. During migration, the server also accepts the existing `NEXT_PUBLIC_AZURE_SPEECH_KEY` and `NEXT_PUBLIC_AZURE_SPEECH_REGION`. The four migrated narration screens use `/api/generate-audio`, so their speech calls do not require a key in the browser. Other existing speech screens still use the legacy public settings; do not remove those settings until those screens have also been migrated. Never use a public prefix for the Groq key.

New environment values apply to new deployments. Add a Preview key separately if the production secret is scoped only to Production. Deploy the migration branch as a preview, then merge after verification. Existing n8n workflows can remain active until the web and installed Android apps have picked up the new version.

## Verification

- `npm test`: route contracts, invalid inputs, provider failures, SSML escaping, MP3 responses.
- `npm run build`: Next.js production build and TypeScript checks.
- In preview: play Today's Promise, miracle narration, Jesus in the Old Testament, and Marian narration; stop and replay each. Check scripture trivia and memory-coach responses.
- Confirm browser network requests use same-origin `/api/` endpoints, with no requests to workflowly.online.
- Repeat the first audio test in the installed Android app after it refreshes its service worker.

Automated tests simulate provider responses. Live Groq generation, Azure credentials/region/quota, and device audio playback must be checked against a deployment with real credentials. Upstream errors are surfaced instead of being replaced with a misleading successful reflection. Prompts and generated content should also be reviewed for theological accuracy.

## Rollback

Use Vercel's prior production deployment or revert the migration commit. The original workflow exports remain available if needed. Do not disable the old workflows before the new deployment passes live checks.
