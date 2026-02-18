# CPP v2 — Dominance & Status Rules
## (Additive Semantic Layer Above CPP v2 Narratives)

### Status
**APPROVED DESIGN SPEC**  
This document defines the missing semantic layer required to correctly assign
`MUST-HAVE`, `HOLD`, and `WATCH` statuses before CPP v2 narrative generation.

CPP v2 narratives are correct and must not be changed.
This layer only governs **when a status is allowed**.

---

## 1. Core Principle (Non-Negotiable)

> **MUST-HAVE requires dominance, not adequacy.**

A player may only be labelled `MUST-HAVE` if not owning them creates
**clear downside risk relative to realistic alternatives**.

If dominance is not proven:
- default to `HOLD` (if already owned)
- default to `WATCH` (if not owned)

CPP v2 narrative language must remain unchanged.

---

## 2. Default Status Rule (Important)

Unless explicitly promoted by the rules below:

- Owned player → `HOLD`
- Non-owned player → `WATCH`

`MUST-HAVE` is an exception state, not a baseline.

---

## 3. Dominance Gate (Global)

A player may only be assigned `MUST-HAVE` if **at least one** of the following
is true:

1. Player is **top-tier** in their position × price band
2. Player has **clear separation** from alternatives
3. Player combines **elite output + elite security**

If none are true → `MUST-HAVE` is forbidden.

This gate runs **before** CPP v2 narrative assembly.

---

## 4. Position-Specific Dominance Rules

### 4.1 Goalkeepers (GK)

**MUST-HAVE is intentionally rare for GK.**

A GK may be `MUST-HAVE` only if **ALL** are true:

- Among top performers for:
  - Points per match
  - Total points
- Plays for a strong defensive team
- Shows repeatable bonus / save value

If any fail:
- `MUST-HAVE` forbidden
- Likely `WATCH` (or `HOLD` if owned)

Notes:
- Minutes played is NOT a signal for GK
- “Safe starter” ≠ dominance

---

### 4.2 Defenders (DEF)

A DEF may be `MUST-HAVE` only if **one** of the following dominance patterns holds:

**Pattern A — Elite Attacking Defender**
- Goals/assists materially above peers
- Bonus involvement
- Minutes secure

**Pattern B — Elite Defensive Anchor**
- Strong clean sheet environment
- Bonus accumulation
- Reliable floor

**Hard Blocker**
If defender has:
- ≤2 points in **3 of last 5 GWs**

→ `MUST-HAVE` forbidden regardless of structure

---

### 4.3 Midfielders (MID)

A MID may be `MUST-HAVE` only if **one** of the following is true:

**Pattern A — Explosive Dominance**
- Regular goals/assists
- High involvement
- Haul potential

**Pattern B — Elite Consistency**
- High points per match
- Bonus accumulation
- Low-variance returns

“Balanced but average” mids must never be `MUST-HAVE`.

---

### 4.4 Forwards (FWD)

A FWD may be `MUST-HAVE` only if **one** of the following holds:

- Goal output dominance
- Bonus dominance relative to peers
- Clear PPM separation

Low-goal, low-bonus forwards:
- `WATCH` at best
- Never `MUST-HAVE`

---

## 5. Structural vs Temporal Enforcement

### Structural Signals (Required for MUST-HAVE)
- Role
- Price band dominance
- Minutes security
- Long-run output

### Temporal Signals (Insufficient Alone)
- Form
- Fixtures
- Recent returns

Rule:
> **Temporal strength may confirm MUST-HAVE, but may never create it alone.**

---

## 6. Optional Narrative Softening (Future-Proofing)

CPP v2 narratives may later distinguish between:

- `MUST-HAVE (Dominant)`
- `MUST-HAVE (Structural)`

This is optional and NOT required for current implementation.

If not implemented:
- Use existing `MUST-HAVE` label only.

---

## 7. Sanity Anchors (Validation Cases)

After implementation, the following should hold:

### MUST-HAVE (Yes)
- Haaland (FWD)
- Rice (MID)
- Gabriel (DEF)

### MUST-HAVE (No)
- Areola (GK)
- Cucurella (DEF)
- Dewsbury-Hall (MID)
- Beto (FWD)

If any of the above violate expectations:
→ dominance gate logic is incorrect.

---

## 8. Explicit Non-Goals

This layer must NOT:

- Introduce new metrics
- Tune thresholds numerically
- Affect bundle generation
- Affect captaincy scoring
- Modify CPP v2 narrative text

It only governs **status eligibility**.

---

## 9. Integration Point (For Dev)

Execution order:

1. Scoring layer
2. CPP flat columns
3. **Dominance & Status Rules (this doc)**
4. CPP v2 narrative assembly
5. Decision logic (transfers, HOLD, bundles)

---

## 10. Summary (One Sentence)

> CPP v2 narratives are correct — this layer ensures they are only spoken
> when the player is truly unavoidable.
