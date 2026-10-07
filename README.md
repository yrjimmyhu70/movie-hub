# MovieHub (Step 1)

## Localhost par chalane ke steps
1. Node.js (18+) install karein.
2. Is folder mein terminal kholein: `npm install`
3. `.env.example` ko copy karke `.env.local` banayein aur TMDB_API_KEY likhein.
4. `npm run dev` chalayein, phir browser mein http://localhost:3000 kholein.

## Vercel par live karna
1. Code GitHub par push karein.
2. vercel.com par "Add New Project" se repo import karein.
3. Settings > Environment Variables mein TMDB_API_KEY aur WATCH_REGION add karein.
4. Deploy dabayein. Har git push par site khud update hogi.

## Free movies
data/free-movies.json mein sirf wohi movies daalein jin ka license aap ke paas ho.
Diye gaye test streams kabhi band ho sakte hain, behtar hai apni files Bunny.net/Cloudflare Stream par host karein.
