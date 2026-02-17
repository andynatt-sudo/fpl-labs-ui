CPP UI Integration Notes (v2.1)
1. Overall framing (very important)

The UI should not assume there is always:

a MUST-HAVE

a “buy now” action

a problem to fix

CPP v2.1 explicitly allows stable / quiet weeks.
The UI’s job is to frame calm as intentional, not as absence of insight.

2. Read order (recommended)

The UI should present information in this order:

Team Diagnostic (top of screen)

HOLD list

WATCHLIST (shortlist only)

Everything else (transfers, bundles, etc.)

This ordering prevents users from jumping to actions before context.

3. team_diagnostic usage
Fields
"team_diagnostic": {
  "recent_performance": "flat | variance_driven | above_average | below_average",
  "primary_driver": "...",
  "action_pressure": "low | medium",
  "recommended_posture": "patience / roll transfer | targeted improvement",
  "capital_efficiency": {
    "low_ceiling_share": 0.42,
    "summary": "..."
  }
}

UI guidance

This should be a summary banner / card

Tone: explanatory, not judgemental

Copy should reinforce that:

“flat” and “variance_driven” are normal

low action pressure is a valid state

Do not translate this into buttons or CTAs directly.

4. MUST-HAVE handling
Important

must_have can be empty

This is not an error state

UI rule

If empty:

show nothing OR

show a subtle note:

“No players currently require forced protection.”

Do not auto-fill or promote other players.

5. HOLD list (primary list in v2.1)
What HOLD means

“No forced sell or upgrade pressure exists.”

In many weeks, most or all owned players will be HOLD.

This is expected.

HOLD item structure
{
  "name": "...",
  "position": "...",
  "team": "...",
  "hold_reason": "HOLD_STABLE_CORE | HOLD_NO_CLEAR_UPGRADE | ...",
  "reason": "human-readable explanation"
}

UI guidance

HOLD is not passive

Treat it as:

“Protected”

“Do not touch unless context changes”

Presentation suggestion

Group HOLD players

Show reason text (not the enum)

Optionally badge:

“Core”

“Fixture drag”

“Waiting for validation”

6. WATCHLIST (shortlist only)
What WATCHLIST is

A curated shortlist of players worth monitoring, not recommendations.

This is not the full WATCH pool.

Structure
"watchlist": {
  "Midfielder": {
    "mid": [ ... ],
    "premium": [ ... ]
  }
}


Each entry:

{
  "name": "...",
  "explanation": "Why interesting but blocked"
}

UI rules

Cap is intentional (≈40–60 players total)

Do not label as “suggested buys”

Language should reinforce:

“Monitor”

“Context-dependent”

“Blocked by X”

7. Language rules (trust-critical)
MUST-HAVE

“Protection”

“Forced”

“High downside if ignored”

HOLD

“Stable”

“No action required”

“Value already captured”

WATCH

“Interesting but blocked”

“Monitor only”

“Requires change in role / form / context”

Never mix these tones.

8. Empty / quiet states

These are valid and common:

No MUST-HAVEs

Low action pressure

Few or no bundles

The UI should:

explain why

not imply missing data

not push artificial actions

9. What the UI should NOT do

❌ Infer new statuses

❌ Promote WATCH → MUST-HAVE

❌ Collapse HOLD into “nothing to do”

❌ Treat flat weeks as failure

CPP already made the decision.
UI should communicate, not reinterpret.

10. Mental model for the user (what UI should reinforce)

“The system is not here to force moves every week.
It’s here to tell you when you must act, when you should wait, and what to keep an eye on.”

If the UI communicates that, trust stays high.