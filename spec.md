# Release Manager Selector - Implementation Plan

## Context
Building a new Next.js + SQLite web app from scratch in `/c/Users/hyrul/codes/release-manager-picker`. The app lets a team randomly pick a weekly release manager in a humorous way, with weighted fairness so the same person isn't repeatedly chosen.

---

## Directory Structure

```
release-manager-picker/
├── package.json / tsconfig.json / next.config.ts
├── tailwind (via postcss, no config file needed for v4)
├── .gitignore
│
├── db/
│   └── database.ts          # SQLite singleton + migrations + typed query helpers
│
├── lib/
│   ├── selection.ts         # Weighted random selection algorithm (pure function)
│   └── types.ts             # Shared TypeScript interfaces
│
├── app/
│   ├── layout.tsx           # Root layout (fonts, global styles)
│   ├── page.tsx             # Main picker page (orchestrates animation state machine)
│   ├── globals.css
│   ├── managers/page.tsx    # Manager CRUD page
│   └── api/
│       ├── managers/route.ts          # GET list, POST create
│       ├── managers/[id]/route.ts     # PUT update, DELETE soft-delete
│       ├── selection/route.ts         # POST trigger selection
│       └── history/route.ts           # GET paginated history
│
├── components/
│   ├── BigRedButton.tsx      # Dramatic trigger button with wobble animation
│   ├── HatchAnimation.tsx    # Multi-phase hatch-drop animation (main spectacle)
│   ├── ConfettiBlast.tsx     # canvas-confetti celebration
│   ├── FunnyMessage.tsx      # Rotating humorous messages with typewriter effect
│   ├── ManagerCard.tsx       # Team member tile with weight/last-picked info
│   ├── ManagerForm.tsx       # Slide-in drawer for add/edit
│   ├── SelectionHistory.tsx  # Scrollable list of past picks
│   └── Nav.tsx               # Top nav bar
│
└── scripts/seed.ts          # Seed script for demo data
```

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS managers (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  avatar_url TEXT,
  is_active  INTEGER NOT NULL DEFAULT 1,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS selection_history (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  manager_id  INTEGER NOT NULL REFERENCES managers(id),
  selected_at TEXT    NOT NULL DEFAULT (datetime('now')),
  notes       TEXT
);

CREATE INDEX IF NOT EXISTS idx_history_manager_selected
  ON selection_history(manager_id, selected_at DESC);
```

DB file: `release-manager.db` at project root (configurable via `DATABASE_PATH` env var).

---

## API Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/managers` | List active managers |
| POST | `/api/managers` | Create manager |
| PUT | `/api/managers/[id]` | Update manager |
| DELETE | `/api/managers/[id]` | Soft-delete (is_active=0) |
| POST | `/api/selection` | Run weighted pick, insert history row |
| GET | `/api/history` | Paginated history (joined with manager names) |

---

## Weighted Selection Algorithm (`lib/selection.ts`)

```
For each active manager:
  1. Find their most recent selection timestamp (epoch if never picked)
  2. daysSincePicked = (now - lastPicked) in fractional days
  3. weight = daysSincePicked ^ 1.5   (amplifies recency gap)
  4. Normalize to probabilities

Select by walking cumulative probability with a random float.
```

Edge cases: single manager → always return them. All tied → uniform random. Inactive managers excluded entirely.

---

## Animation State Machine (`app/page.tsx`)

```
idle → picking → dropping → seated → celebrating → idle
```

- **idle**: Hatch closed, button ready
- **picking**: API call in-flight; hatch rattles/vibrates to build tension
- **dropping**: API responded; hatch doors swing open (3D `rotateY`), figure falls with gravity + tumble
- **seated**: Figure lands in spinning office chair, name badge appears
- **celebrating**: Confetti fires, random funny message animates in with typewriter effect

Key Framer Motion technique: `useAnimate` hook with `async/await` for imperative sequencing.

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^15", "react": "^19", "react-dom": "^19",
    "better-sqlite3": "^11", "framer-motion": "^12", "canvas-confetti": "^1"
  },
  "devDependencies": {
    "typescript": "^5", "@types/better-sqlite3": "^7",
    "@types/canvas-confetti": "^1", "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4", "tsx": "^4"
  }
}
```

---

## Implementation Order

1. **Scaffold** — `npx create-next-app@latest` + install deps
2. **DB layer** — `db/database.ts`: singleton, migrations, typed helpers
3. **Types** — `lib/types.ts`
4. **Selection algorithm** — `lib/selection.ts` (pure, testable)
5. **API routes** — managers CRUD, then selection endpoint
6. **Layout + Nav** — root layout with dramatic font (e.g. "Bangers"), dark theme
7. **Manager CRUD page** — functional first, animations secondary
8. **Main page shell** — layout, BigRedButton, API wiring (no animation yet)
9. **HatchAnimation** — build incrementally: geometry → door open → fall → seated
10. **Celebration layer** — ConfettiBlast + FunnyMessage
11. **Polish** — weight bars on cards, keyboard shortcut (Space), sound toggle
12. **Seed script** — `scripts/seed.ts` with 5-6 fake managers + history

---

## Funny Messages (sample)
- "Congratulations! Your suffering begins now."
- "[Name] has been chosen by the ancient spirits of DevOps."
- "[Name] will spend the next sprint saying 'it works on my machine' to everyone."
- "Pour one out for [Name], our brave release manager."
- "The release pipeline has claimed another victim: [Name]."

---

## Verification

1. Run `npm run dev`, navigate to `http://localhost:3000`
2. Go to `/managers` and add 3+ team members
3. Return to home, click the big red button
4. Verify: hatch animation plays, someone is selected, confetti fires, funny message appears
5. Click again — verify previously-selected person has lower probability (check weight display on cards)
6. Check `/api/history` returns the selection log
