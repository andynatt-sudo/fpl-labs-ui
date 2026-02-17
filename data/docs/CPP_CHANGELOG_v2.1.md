CPP vX.Y
Status: DRAFT | ACTIVE | LOCKED
Date:
Owner:


1. Scope (Hard Lock)

What is allowed to change in this version?

- [ ] Status eligibility
- [ ] New blocking signals
- [ ] Signal semantics


Explicitly NOT changing:
- Narratives
- Scoring
- Threshold tuning (unless stated)
- UI logic

2. Problem Statement (1–3 bullets)

- What incorrect behaviour exists?
- Why current signals cannot express it

- Players with strong structure but broken minutes are still MUST-HAVE

3. Existing Signals (Inventory)

List only what already exists before this change.

- cpp_minutes_ok
- cpp_explosive
- cpp_must_have
- team_health flags

4. Missing Signal(s)

Name only. No logic yet.

NEW:
- cpp_minutes_continuity_ok

5. Signal Semantics (Plain English)

One sentence per signal.

cpp_minutes_continuity_ok:
True only if the player is part of the recent starting XI,
not merely available or recently returned.

6. Minimal Derivation Rule (Temporary)

This is allowed to change later.

TRUE if:
- Started ≥2 of last 3 GWs
- AND no ≥2 consecutive DNPs in last 5
ELSE false

7. Status Gate Impact

Explicit forbiddance only.

IF cpp_minutes_continuity_ok == False
→ MUST-HAVE forbidden
→ collapse to HOLD / WATCH

8. Sanity Anchors

Human checks.

SHOULD demote:
- Injury-return one-start players

SHOULD preserve:
- Established starters with low recent returns

9. Integration Point

Where code changes live.

- CPP v1 builder layer
- File: <path>

10. Freeze Criteria

When this version is considered “done”.

- MUST-HAVE list shrinks
- No narrative changes
- No false promotions

PART 2 — MAP CPP LOOP → YOUR FILES
1️⃣ Raw data (facts only)
player_gameweek_stats.csv
team_health.json

2️⃣ CPP v1 Builder (POLICY LAYER) ← WE WORK HERE

This is where all iteration happens.

Add / derive here:

cpp_minutes_ok
cpp_minutes_continuity_ok   ← NEW
cpp_must_have (final)
cpp_hold
cpp_status_final


👉 This is where CPP v1.3 lives.

3️⃣ CPP v2 Status Rules
cpp_v2_2.md


Dominance gates

Structural forbiddance

No time-based logic added here

4️⃣ CPP v2 Narrative (READ-ONLY)
cpp_v2.py


Consumes:

cpp_must_have
cpp_minutes_ok
cpp_explosive
cpp_status_final


🚫 Never add logic here
🚫 Never infer continuity here

5️⃣ Output
players.json
profiles.json
