# Release Roulette 🎭

A dramatic, animated web app for randomly picking a weekly release manager. Features a weighted-fairness algorithm (people picked recently are less likely to be re-chosen), stick-figure stage animations, trap-door drop sequence, confetti, and a growing hall-of-shame history.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **better-sqlite3** — embedded SQLite, no external DB needed
- **canvas-confetti** — celebration effects

---

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Seed demo data (optional)

```bash
npx tsx tests/scripts/seed.ts
```

Inserts 6 team members and 3 historical picks into the local DB (`release-manager.db`).

### Build for production

```bash
npm run build
npm start
```

> **Note (Windows/WSL only):** The build script pre-cleans `.next/export` and writes a `prerender-manifest.json` shim after the build. This works around an EIO filesystem error that occurs when Next.js tries to `rmdir .next/export` on NTFS-mounted paths. Inside Docker (Linux filesystem), this issue does not occur.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with hot reload (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server (requires build first) |
| `npx tsx tests/scripts/seed.ts` | Seed demo data |

---

## Docker

### Quick start (single container)

```bash
docker build -f docker/Dockerfile -t release-roulette .
docker run -p 3000:3000 -v roulette-data:/app/data release-roulette
```

The SQLite database lives at `/app/data/release-manager.db` inside the container. The named volume `roulette-data` persists it across restarts.

### Docker Compose (recommended)

```bash
docker compose -f docker/docker-compose.yml up
```

Seed demo data on first run:

```bash
docker compose -f docker/docker-compose.yml run --rm app npx tsx tests/scripts/seed.ts
```

Stop:

```bash
docker compose -f docker/docker-compose.yml down        # keeps data
docker compose -f docker/docker-compose.yml down -v     # wipes data volume
```

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_PATH` | `./release-manager.db` | Path to SQLite DB file |
| `PORT` | `3000` | Server port |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # Main picker (animation state machine)
│   ├── globals.css
│   ├── managers/page.tsx       # Team CRUD
│   └── api/
│       ├── managers/route.ts
│       ├── managers/[id]/route.ts
│       ├── selection/route.ts  # Weighted pick + history
│       └── history/route.ts
├── components/
├── db/database.ts              # SQLite singleton + auto-migrations
└── lib/
    ├── selection.ts            # Weighted random algorithm
    ├── messages.ts             # 30 funny messages
    └── types.ts
tests/
└── scripts/seed.ts
scripts/
└── postbuild.mjs              # Writes prerender-manifest.json on Windows builds
docker/
├── Dockerfile
└── docker-compose.yml
```
