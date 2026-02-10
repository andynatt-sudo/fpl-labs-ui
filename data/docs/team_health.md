## 2️⃣ `team_health.json` — README.md

```markdown
# team_health.json — Squad Health Diagnostic

## Purpose

`team_health.json` provides a **structural health check** of the squad.

It answers:
> “How resilient is my team if things go wrong?”

This is a **risk and resilience diagnostic**, not a transfer engine.

---

## What question this JSON answers

- How structurally healthy is my squad?
- Where are the hidden risks?
- Is value concentrated in fragile or low-ceiling roles?

---

## What this JSON explicitly does NOT answer

- Which transfers to make
- Who to buy or sell
- Short-term points optimisation

It explains *why* problems may exist, not how to fix them.

---

## Mental model

Think of this JSON as:
> “A medical check-up, not a prescription.”

It highlights **conditions**, not **actions**.

---

## Primary vs secondary signals

### Primary signals
- `health_score`
- `health_band`
- `flags`

### Secondary signals
- `summary`
- players listed inside flags

---

## Top-level structure

```json
{
  "team_id": ...,
  "gameweek": ...,
  "health_score": ...,
  "health_band": ...,
  "summary": ...,
  "flags": [ ... ]
}
