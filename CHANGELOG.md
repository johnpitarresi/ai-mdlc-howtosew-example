# CHANGELOG.md

> **MDLC™ Build Progress Log**
> Project: **Sewing** | Build Depth: `standard`

---

## [1.0.0] — 2026-03-13 — Stage 4: Working System

### Added
- F-03: `js/progress.js` — full localStorage module with graceful degradation
- F-10: `css/print.css` — print media styles for reference pages
- F-11: `NOTICE`, `README.md` — MDLC structural attribution
- F-07: `js/navigation.js` — sidebar state, mark-complete, export/import
- F-06: `js/quiz.js` — quiz engine (render, validate, score, retry)
- F-04: `index.html` — dashboard with 10 lesson cards and progress bar
- F-05: All 10 lesson pages (`lessons/01-tools.html` through `lessons/10-project-pillow.html`)
- F-06b: All 4 quiz pages (`quiz/quiz-tools.html` through `quiz/quiz-fabrics.html`)
- F-08: All 4 reference pages (`reference/stitch-glossary.html` through `reference/common-problems.html`)
- F-09: Export/Import progress (integrated in navigation.js + progress.js)
- `COMPLIANCE.md` — all 60+ requirements mapped to code with PASS status
- `SECURITY-AUDIT.md` — security gate PASS WITH ADVISORY (zero dependencies)

## [0.3.0] — 2026-03-13 — Stage 3 Build Begin

### Added
- F-01: `css/main.css` — design tokens, global reset, layout, sidebar, header, footer, buttons
- F-01: `css/lesson.css` — lesson page styles, callout boxes, mark-complete button, progress dots
- F-01: `css/quiz.css` — quiz form, answer options, result card styles
- F-01: `data/data.js` — LESSONS_DATA (10 entries), STITCHES_DATA (12 entries), FABRICS_DATA (10 entries)
