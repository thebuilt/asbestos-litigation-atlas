# Asbestos Litigation Atlas

Backend-powered dashboard for exploring asbestos-related U.S. litigation with:

- nationwide interactive map
- court-wise toggles
- exposures, materials, occupations, and outcome views
- class-action section
- live CourtListener search mode through a server-side API route

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. In Vercel project settings, add an environment variable:

```text
COURTLISTENER_API_TOKEN=your_token_here
```

4. Redeploy.
5. Open the live Vercel URL and click `Fetch live CourtListener data`.

## Local preview

For the static UI only:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

For live backend search locally, use `vercel dev` or deploy to Vercel. A plain static server will not run `/api/search`.

## CourtListener token

1. Create a free account at `https://www.courtlistener.com/`.
2. While signed in, open `https://www.courtlistener.com/help/api/rest/`.
3. Find `Sign In To See Your Token` / token section.
4. Copy the API token.
5. Put it in Vercel as `COURTLISTENER_API_TOKEN`.
6. Optionally paste it into the dashboard as a one-browser override for testing.

## Notes

- The dashboard starts with a showcase dataset so it is immediately usable.
- Live mode uses a server-side `/api/search` function that queries CourtListener across multiple paginated search families.
- GitHub Pages can host the static files, but it cannot run the backend route needed for secure live search.
- Venue geography in live mode is inferred from the court name and court ID.
