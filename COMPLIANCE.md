# COMPLIANCE.md

> **MDLC™ Spec-to-Code Traceability Matrix**
> Project: **Sewing** | Final — Stage 3 Complete

| Spec Ref | Requirement | Implementation File | Status |
|----------|-------------|---------------------|--------|
| F-01 | Directory structure exists | project root | PASS |
| F-01 | `main.css` defines all custom properties | `css/main.css` | PASS |
| F-01 | `lesson.css` exists with callout and lesson styles | `css/lesson.css` | PASS |
| F-01 | `quiz.css` exists with quiz form and result styles | `css/quiz.css` | PASS |
| F-01 | `data.js` exports LESSONS_DATA (10 entries) | `data/data.js` | PASS |
| F-01 | `data.js` exports STITCHES_DATA (≥10 entries, 12 provided) | `data/data.js` | PASS |
| F-01 | `data.js` exports FABRICS_DATA (≥8 entries, 10 provided) | `data/data.js` | PASS |
| F-03 | `progress.js` module exists with full public API | `js/progress.js` | PASS |
| F-03 | `Progress.markLessonComplete` persists to localStorage | `js/progress.js` | PASS |
| F-03 | Graceful degradation when localStorage unavailable | `js/progress.js` (`_disabled` flag) | PASS |
| F-03 | `Progress.exportProgress` returns valid JSON | `js/progress.js` | PASS |
| F-03 | `Progress.importProgress` validates schema v1 and restores | `js/progress.js` | PASS |
| F-03 | No direct localStorage calls outside progress.js | All JS files | PASS |
| F-04 | Dashboard renders all 10 lesson cards | `index.html` | PASS |
| F-04 | Master progress bar shows correct state | `index.html` + `js/navigation.js` | PASS |
| F-04 | All 4 reference section cards present | `index.html` | PASS |
| F-04 | Page title is "Learn to Sew — Sewing" | `index.html` | PASS |
| F-05 | All 10 lesson HTML files exist | `lessons/*.html` | PASS |
| F-05 | Each lesson has correct `data-lesson-id` | `lessons/*.html` | PASS |
| F-05 | Each lesson has ≥1 callout box | `lessons/*.html` | PASS |
| F-05 | Lesson 04 has ≥2 callouts and numbered threading steps | `lessons/04-machine-basics.html` | PASS |
| F-05 | Mark Complete button on every lesson | `lessons/*.html` | PASS |
| F-05 | Correct prev/next navigation on every lesson | `lessons/*.html` | PASS |
| F-05 | Lesson 01 has no previous link; Lesson 10 has no next link | `lessons/01-tools.html`, `lessons/10-project-pillow.html` | PASS |
| F-06 | `quiz.js` engine exists | `js/quiz.js` | PASS |
| F-06 | All 4 quiz HTML files exist | `quiz/*.html` | PASS |
| F-06 | Quiz validates unanswered questions (aria-live alert) | `js/quiz.js` | PASS |
| F-06 | Score ≥80% (4/5) renders pass state | `js/quiz.js` (0.8 threshold) | PASS |
| F-06 | Score saved to localStorage via Progress.saveQuizScore | `js/quiz.js` | PASS |
| F-06 | Retry re-renders quiz without navigation | `js/quiz.js` (_render() call) | PASS |
| F-06 | Each quiz has exactly 5 questions | `quiz/*.html` | PASS |
| F-07 | `navigation.js` module exists | `js/navigation.js` | PASS |
| F-07 | Sidebar progress updates on lesson complete | `js/navigation.js` (updateSidebarProgress) | PASS |
| F-07 | Active sidebar link has `aria-current="page"` | `js/navigation.js` (setActiveSidebarLink) | PASS |
| F-07 | Mark Complete button state set on page load | `js/navigation.js` (initLesson) | PASS |
| F-07 | All `<body>` tags have correct `data-page` attribute | All HTML files | PASS |
| F-07 | Mobile hamburger opens/closes sidebar with Escape support | `js/navigation.js` (initMobileNav) | PASS |
| F-08 | All 4 reference HTML files exist | `reference/*.html` | PASS |
| F-08 | Stitch glossary renders all STITCHES_DATA entries dynamically | `reference/stitch-glossary.html` | PASS |
| F-08 | Fabric guide renders all FABRICS_DATA as table dynamically | `reference/fabric-guide.html` | PASS |
| F-08 | Needle chart has 7-row static table | `reference/needle-chart.html` | PASS |
| F-08 | Common problems has 8 problem articles | `reference/common-problems.html` | PASS |
| F-08 | Tables have `<th scope="col">` headers | `reference/*.html` | PASS |
| F-09 | Export creates Blob and triggers download | `js/navigation.js` (handleExport) | PASS |
| F-09 | Export produces valid JSON containing version+lessons+scores | `js/progress.js` + `js/navigation.js` | PASS |
| F-09 | Import opens file picker (hidden input) | `js/navigation.js` (handleImport) | PASS |
| F-09 | Import validates JSON and shows error on invalid file | `js/progress.js` (importProgress throws) | PASS |
| F-09 | Import does not insert file content as innerHTML | `js/navigation.js`, `js/progress.js` | PASS |
| F-10 | `print.css` exists with `@media print` rules | `css/print.css` | PASS |
| F-10 | Print hides sidebar, header, footer, lesson-nav | `css/print.css` | PASS |
| F-10 | Tables print with visible cell borders | `css/print.css` | PASS |
| F-11 | NOTICE file exists with correct MDLC attribution text | `NOTICE` | PASS |
| F-11 | README.md has "Built with" section | `README.md` | PASS |
| F-11 | No MDLC branding in site UI (structural only) | All HTML files | PASS |
| NFR | No page makes external network requests | All HTML (no CDN, no external src) | PASS |
| NFR | Every page has `<html lang="en">` | All HTML files | PASS |
| NFR | All interactive elements keyboard-accessible | CSS `:focus-visible` rules in main.css | PASS |
| NFR | Skip link on every page | All HTML files | PASS |
| NFR | No `eval()` in any JS file | progress.js, navigation.js, quiz.js | PASS |
| NFR | No `innerHTML` with localStorage/file data | All JS: uses textContent and createElement | PASS |
| NFR | System fonts only (no external font requests) | main.css custom properties | PASS |
| NFR | Works on file:// protocol (no fetch() for data) | data/data.js uses window globals | PASS |
