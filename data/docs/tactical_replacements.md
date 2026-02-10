# tactical_replacements.json — Tactical Replacement Lens

## Purpose

`tactical_replacements.json` provides **situational, short-horizon replacement options**
for specific players who are currently underperforming relative to peers.

It answers:
> “If I were to move *this* player now, what are the sensible tactical options?”

This file is **optional** and **context-dependent**.  
It is not a mandatory action list.

---

## What question this JSON answers

- Which players in my squad are currently dragging short-term output?
- If I replace them, what are the *reasonable* alternatives?
- What is the trade-off between safety and upside?

---

## What this JSON explicitly does NOT answer

- Whether you *should* make a transfer
- Long-term squad construction
- Optimal transfers across multiple positions
- Budget feasibility across multiple moves

Those concerns are handled elsewhere.

---

## Mental model

Think of this JSON as:
> “If you *decide* to act, here are the sane options.”

It does not create urgency.  
It only reduces decision friction *after* a decision is made.

---

## Primary vs secondary signals

### Primary signals
- `outgoing` player context
- Replacement grouping (`safe_productivity` vs `higher_upside`)

### Secondary signals
- `form`
- `price_band`
- `minutes_secure`

These help compare options but do not imply preference.

---

## Top-level structure

```json
{
  "meta": { ... },
  "items": [ ... ]
}
