📦 Backend / Data Contract Changelog

Phase 1 – Semantic Cleanup & Transfer Intelligence Refactor

High-level summary (for PM)

We refactored the JSON outputs to cleanly separate diagnostics, squad state, and transfer logic.
Previously, some feeds mixed health, view, and advice, which would have caused UI confusion and misleading narratives.

The new structure:

- makes intent explicit
- avoids duplicated concepts across feeds
- gives the UI clearer building blocks
- enables new features without backend rework

No scoring logic was changed — this is purely a semantic and structural improvement.

1️⃣ team_view.json — Squad snapshot (descriptive only)
What changed

Removed all transfer-oriented fields:

- missing_must_haves
- owned_must_haves
- risk_flags
- fix_priority

Retained only descriptive squad state:

-starters vs bench by position
- minutes security
- availability
- fixture stress
- neutral narrative notes (structural_notes)

Why

team_view is now strictly:

“What does my squad look like right now?”

It no longer:

- implies actions
- suggests priorities
- leaks transfer advice

UI implications

- Use this as the main squad overview screen
- Safe to render without triggering “you should do something” anxiety
- Can be shown even when no transfers are recommended

2️⃣ team_health.json — Diagnostic risk layer
What changed

- Removed missing_must_haves
- Health now contains only diagnostics:
   - health_score
   - health_band
   - narrative summary
   - structured flags (e.g. VALUE_TRAP, LOW_CEILING)

Why
team_health now strictly answers:

“Is my squad safe and resilient if I do nothing?”

No transfer advice or shopping lists live here.

UI implications

- Use for:
   - warning banners
   - Confidence indicators
   - contextual framing (“fragile but playable”)

Should not directly trigger transfer CTAs

3️⃣ transfer_context.json — New feed (structural gaps)

What’s new
Introduced a new JSON feed to house structural transfer context:

- missing_must_haves
- (future) structural priorities, template gaps

Why
This separates:

- diagnostics (team_health)
- state (team_view)
- contextual gaps (transfer_context)
- actions (single_transfers / tactical_replacements)

This avoids semantic overload in any single feed.

UI implications

- Use this as background context in transfer flows
- Not prescriptive on its own
- Explains why some transfers might exist, without forcing them

4️⃣ single_transfers.json — Optimisation-only

What changed
- Removed health_band from meta
- Reframed meta to reflect outcome, not diagnosis:

   - e.g. outcome: "none"
   - reason: “No clear single transfer offers a high-confidence improvement”
- Neutralised transfer_type labels:

  - from HEALTH_FIX, STRUCTURAL_FIX
  - to descriptive categories like PERFORMANCE_UPGRADE, AVAILABILITY_IMPROVEMENT

Why
single_transfers now answers:

“Is there a clear, high-confidence single move worth making?”

It does not imply urgency or obligation.

UI implications

- If empty, UI should say:
  - “No obvious single upgrade right now”
- Should not reuse health language here
- This is a confidence-based recommendation feed

5️⃣ tactical_replacements.json — Short-term productivity lens (unchanged logic, clearer semantics)
What it represents

A separate decision lens:

“Swap out poor-form assets for short-term productivity, without claiming it’s optimal long-term.”
Key characteristics:

- Safe vs upside replacements

- Capital efficiency focus

- Explicitly not “best transfer”

UI implications

- Should be framed as:
   - optional
   - situational
   - explanatory

UI should clearly separate this from single_transfers

6️⃣ Export architecture cleanup
What changed

- All JSON writers consolidated into a shared exporter

- Clear separation between:
   - analysis (pandas)
   - normalisation
   - export (pure JSON)

Why

This prevents:

- data shape bugs
- pandas leaking into UI logic
- future refactor pain

UI / PM implications

- JSON contracts are now stable
- UI can be built without expecting shape churn

🚀 New UI / Product Opportunities Enabled

Because of this refactor, the UI can now:

1. Layer information cleanly
   - Team View → Health Overlay → Transfer Context → Actions

2.Explain “why nothing is recommended”
   - No more confusing empty states

3. Support multiple decision lenses
   - Optimisation vs tactical vs structural

4. Avoid misleading language
   - Minutes ≠ consistency
   - Health ≠ must transfer

5. Scale to Phase 2
- Multi-transfer planning
- Priority narratives
- User-controlled lenses
