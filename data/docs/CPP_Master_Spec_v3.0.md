# Canonical Player Profile (CPP) --- Master Specification

**Version:** 3.0 Consolidated\
**Status:** LOCKED BASELINE\
**Date:** 2026-02-19\
**Owner:** FPL Labs

------------------------------------------------------------------------

# SECTION 1 --- Governance Lock (CPP v3.0)

CPP v3.0 is the single deterministic authority for structural player
status.

## Authority

CPP owns:

-   MUST-HAVE
-   HOLD
-   WATCH
-   Dominance gating logic
-   Structural vs temporal enforcement
-   Canonical flat outputs:
    -   cpp_status_final
    -   cpp_minutes_ok
    -   cpp_minutes_continuity_ok
    -   cpp_minutes_band
    -   cpp_explosive
    -   cpp_ceiling_class
    -   cpp_structural_role

CPP does NOT own:

-   Scoring
-   Captain logic
-   Transfer logic
-   Bundle logic
-   Risk pillar logic
-   JSON serialization

Only Governance may assign `cpp_status_final`.

------------------------------------------------------------------------

# SECTION 2 --- Dominance & Status Rules (CPP v2 → v3 Locked)

## Core Principle

MUST-HAVE requires dominance, not adequacy.

Default rule:

-   Owned → HOLD
-   Not owned → WATCH

MUST-HAVE is exception-only.

## Structural vs Temporal Rule

Structural signals: - Role - Minutes security - Price band dominance -
Repeatable output

Temporal signals: - Form - Fixtures - Short-term returns

Temporal signals may confirm, but never create, MUST-HAVE.

## Position-Specific Enforcement

### GK

MUST-HAVE only if elite PPM + strong team + repeatable saves/bonus.

### DEF

Must show attacking dominance OR elite defensive anchor profile. Hard
block if poor recent return streak.

### MID

Explosive dominance OR elite consistency required.

### FWD

Goal output dominance or clear PPM separation required.

------------------------------------------------------------------------

# SECTION 3 --- Narrative Contract (CPP v2 Narrative Spec)

CPP narrative:

-   Status-led
-   Deterministic
-   Max 3 sentences
-   One dominant storyline
-   No numbers
-   No transfer recommendations

Narrative modes:

## MUST-HAVE

Assertive. Structural dominance framing.

## HOLD

Defensive framing. Patience emphasis.

## WATCH

Conditional tone. Monitoring language.

Structural and temporal reasoning must never mix within a single
sentence.

------------------------------------------------------------------------

# SECTION 4 --- UI Integration Rules (v2.1)

UI must:

-   Accept empty MUST-HAVE weeks
-   Treat HOLD as protected core
-   Present WATCH as shortlist only
-   Never infer new statuses
-   Never promote WATCH automatically

Quiet weeks are valid states.

------------------------------------------------------------------------

# SECTION 5 --- Change Control Template

Future CPP modifications must follow structured version template:

1.  Scope
2.  Problem statement
3.  Existing signals
4.  Missing signals
5.  Signal semantics
6.  Minimal derivation rule
7.  Status gate impact
8.  Sanity anchors
9.  Integration point
10. Freeze criteria

No ad-hoc logic changes allowed.

------------------------------------------------------------------------

# SECTION 6 --- Architecture Alignment (v3.1)

CPP resides in Governance layer.

Layer order:

Data → Intelligence → Diagnostics → Prediction → Governance → Execution
→ Export → UI

Non-circularity rules:

1.  Risk may not override CPP.
2.  Prediction may not override Governance.
3.  Execution may not modify lens outputs.
4.  Export may not compute analytics.
5.  UI may not model.

------------------------------------------------------------------------

# SECTION 7 --- Freeze Criteria

CPP v3.0 considered stable when:

-   No legacy flags exist (cpp_must_have, cpp_hold)
-   Only governance assigns status
-   Narrative contains no decision logic
-   All execution engines consume profile semantics only

------------------------------------------------------------------------

# End of Consolidated CPP Specification
