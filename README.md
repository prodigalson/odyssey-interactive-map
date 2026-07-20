# Odyssey — An Interactive Voyage

A mobile-first interactive map tracing Odysseus' journey across the Mediterranean. The primary route follows the strongest identifications in the supplied research, while disputed locations are collected in a separate appendix.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add a Google Maps browser key with the Places API enabled to load high-resolution location photography:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_browser_key
```

Restrict the key to the deployed site domain in Google Cloud Console.

## Production

```bash
npm run build
```
