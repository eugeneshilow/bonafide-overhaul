# Bona Fide Overhaul

MVP новой версии e-commerce сайта Bona Fide.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Node.js route handlers для backend/API слоя
- Vercel для хостинга frontend и serverless функций

## Getting Started

Use Node.js 20.9+.

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Health check API:

```bash
curl http://localhost:3000/api/health
```

Catalog API:

```bash
curl http://localhost:3000/api/catalog
```

## Project Structure

- `src/app` - routes, layouts, pages, API route handlers
- `src/app/api` - Node.js backend endpoints
- `src/app/globals.css` - global Tailwind entrypoint and theme tokens

## Deploy

Import this repository in Vercel. Vercel will detect Next.js automatically.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
