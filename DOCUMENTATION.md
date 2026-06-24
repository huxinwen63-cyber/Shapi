# Numi — Feature Documentation

Numi is a bilingual (English / 中文) number-sense app for children aged 4–7. It turns
key skills from number-sense research into playful mini-games, with avatar rewards,
a parent center, and a self-assessment. This document covers the current prototype
features and the roadmap for future improvements.

> An in-app version of this documentation lives under **Settings → For Educators**.

---

## Current Features

### 1. Three Learning Units (Worlds)
The curriculum is organized into three progressive worlds, each with its own activities and skills.

| # | World | Objective | Activities |
|---|-------|-----------|------------|
| 1 | **See Numbers** (Perception) | Recognize small quantities (1–5) at a glance and compare amounts | Quick Count, More or Less, Number Match |
| 2 | **Where Numbers Live** (Representation) | Place numbers on a line and understand order, size, and place value | Number Line, Tens & Ones (Place Value) |
| 3 | **Number Magic** (Operation) | Break numbers into parts and recombine them | Make & Break (Part-Whole) — _Easy Math (add/subtract) coming soon_ |

### 2. Interactive Games
- **Quick Count (Subitizing)** — recognize 1–5 without counting.
- **More or Less (Comparison)** — compare two groups.
- **Number Match** — match a numeral to the matching group of dots.
- **Number Line** — place a number in its position on the line.
- **Tens & Ones (Place Value)** — pick the bundle-of-ten + ones that make a number.
- **Make & Break (Part-Whole)** — find the missing part of a number bond (e.g. 6 = 3 + ?).

Each game has a short "How to play" intro, auto-generated questions, instant feedback,
a star score, and a 10-round progress bar.

### 3. Bilingual Support
- One-tap English / 中文 toggle, available on the welcome screen and in Settings.
- All UI copy and game prompts are fully translated.

### 4. Avatar & Reward Features
- **Face buddy** — a minimal animated line-style smiley.
- Completing a world gives the face a **new color** and unlocks an **additional expression**
  (Smile → Happy → Wow → Cool).
- **Stars** earned in games and **badges** for milestones.

### 5. Parent Dashboard
- Email login (prototype).
- Child summary: learning minutes, activities completed, current streak.
- Per-skill progress bars and a personalized recommendation.

### 6. Monthly Report
- Subscribe/unsubscribe to a monthly email report.
- In-app report preview with stats, skill progress, and recommendations.
- "Send test report" action (mock).

### 7. Self-Assessment (Number Sense Check)
- A multi-question, multi-dimension check of number-sense development.
- Tracks response speed and shows a friendly, non-diagnostic result summary.

### 8. Walkthroughs
- **Students & Parents** — a multi-step onboarding shown after the welcome screen and
  re-openable via **Settings → How It Works**.
- **Educators & Partners** — an overview hub under **Settings → For Educators** covering
  the approach, units, features, classroom use, and roadmap.

---

## Future Improvement Goals
- Finish the **Easy Math** (add/subtract) game to complete the third unit.
- Real user accounts and **cloud progress sync** (currently demo/local state).
- **Adaptive practice** recommendations per child.
- A **teacher dashboard** for class management and batch reports.
- **Voice narration** and broader accessibility support.
- Real email delivery for monthly reports.

---

## Tech Notes
- Next.js (App Router) + React, Tailwind CSS, shadcn/ui, lucide-react icons.
- All screens are client components orchestrated by `components/shapi/app-shell.tsx`.
- Copy lives in `lib/translations.ts` (zh + en); language state in `lib/language-context.tsx`.
- Progress/parent data is currently mock/demo state — no backend yet.
