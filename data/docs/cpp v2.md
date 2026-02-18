📘 CanonicalPlayerProfile v2 — Narrative & Explanation Contract

(Implementation Spec for Dev Agent)

0️⃣ Purpose (Put This at the Top of the File)

CPP v2 exists to provide a single, human-readable explanation of a player’s current status and risk profile.
It does not make decisions. It explains them.

CPP v2 explanations must be:

deterministic

short

status-led

consistent across features

1️⃣ CPP v2 Object Scope (What This Layer Owns)

CPP v2 does own:

narrative status (MUST-HAVE / HOLD / WATCH)

structural vs temporal framing

ceiling / floor / minutes interpretation

human-readable explanation text

CPP v2 does NOT own:

scoring

thresholds

transfer decisions

bundle logic

CPP v2 consumes flat cpp_ columns only*.

2️⃣ Status-First Explanation Rule (Hard Requirement)

Every CPP explanation must begin with status framing.

Allowed statuses (exact strings):

MUST-HAVE

HOLD

WATCH

Status determines which narrative mode is active.

3️⃣ Narrative Modes by Status (Mutually Exclusive)
🟢 MUST-HAVE Narrative Mode

Meaning

Not owning this player creates structural downside risk.

Narrative constraints

Assertive, not speculative

Structural reasoning dominates

Never framed as optional

Allowed reasons (choose max 2):

Structural dominance (role / band / output)

High replacement difficulty

Repeatable floor OR dominant ceiling

Broad consensus signal (ownership / bonus / usage)

Language rules

Allowed words: reliable, core, structural, unavoidable

Forbidden words: could, monitor, interesting, if

Example template

MUST-HAVE: Structural pick.
<Primary structural reason>.
<Optional reinforcement>.

🟡 HOLD Narrative Mode

Meaning

Selling this player now is more likely to hurt than help.

Narrative constraints

Defensive framing

Emphasise patience and protection

No upside hype

Allowed reasons (choose max 2):

Structural role intact

Temporary dip not decisive

Fixtures or context improving

No clear upgrade available

Language rules

Allowed words: stable, protected, no urgency, patience

Forbidden words: essential, explosive, must buy

Example template

HOLD: Value already captured.
<Structural stability reason>.
<Optional temporal context>.

🔵 WATCH Narrative Mode

Meaning

Upside exists, but conditions are not yet decisive.

Narrative constraints

Conditional tone

Acknowledge uncertainty

Invite observation, not action

Allowed reasons (choose max 2):

Emerging form

Role change potential

Good metrics without validation

Fixture-driven opportunity

Language rules

Allowed words: monitoring, emerging, if sustained, could become

Forbidden words: safe, essential, no risk

Example template

WATCH: Context-dependent upside.
<What is improving>.
<What still needs confirmation>.

4️⃣ Structural vs Temporal Framing (Mandatory Separation)

Each explanation sentence must be classified as one of:

Structural (slow-moving, trust-building)

Temporal (short-term, timing-sensitive)

Structural signals include:

role archetype

price band dominance

minutes security

bonus tendencies

long-run output

Temporal signals include:

form

recent returns

fixtures

short-term usage

Hard rule

A single sentence may not mix structural and temporal reasoning.

❌ “Essential despite poor form”
✅ Separate sentences, or choose one frame.

5️⃣ Ceiling / Floor / Minutes — Narrative Interpretation Rules

These are interpretive labels, not numbers.

🔺 Ceiling framing

Use only when:

Player returns in spikes

Upside is meaningful

Language:

explosive, high-impact, haul potential

Constraint:

Ceiling alone never justifies MUST-HAVE

🔻 Floor framing

Use when:

Points accumulate steadily

Bonus / defensive / assist heavy

Language:

reliable, repeatable, low-variance

Floor is the primary MUST-HAVE justification.

⏱️ Minutes framing

Binary only:

Minutes secure

Minutes uncertain

Rules:

MUST-HAVE → only if secure

HOLD → often central

WATCH → uncertainty acceptable

No probabilistic phrasing allowed.

6️⃣ Explanation Assembly Rules (Strict)

Each CPP v2 explanation must contain:

Status line (one sentence, fixed phrasing)

Primary structural sentence

Optional temporal modifier

Limits:

Max 3 sentences total

Max 1 dominant storyline

No player-to-player comparisons

No numbers in narrative text

7️⃣ What CPP v2 Must Never Do (Enforced)

CPP v2 explanations must not:

recommend transfers

mention alternatives

reference hidden thresholds

hedge (“probably”, “might”)

stack multiple narratives

CPP explains why the status exists, nothing else.

8️⃣ Validation Checklist (Dev Self-Test)

An explanation is valid if a human can answer:

Why is this player MUST-HAVE / HOLD / WATCH?

Is that reason structural or temporal?

What is the main risk if I act (or don’t)?

If any answer is unclear → explanation is invalid.

9️⃣ One-Paragraph Dev Handover (Copy-Paste)

CPP v2 Narrative Contract
Implement CPP v2 as a status-led, human-readable explanation layer built from flat cpp_* columns. Explanations must follow fixed narrative modes for MUST-HAVE, HOLD, and WATCH, with clear separation of structural vs temporal reasoning. Use deterministic language rules for ceiling, floor, and minutes security. Limit output to one dominant storyline (max three short sentences). CPP v2 explains why a player matters, not what to do.

Final note (important)

This spec gives the dev agent:

zero ambiguity

zero tuning pressure

zero logic overlap

If they implement this faithfully:

CPP v2 becomes the voice of the system

All future features inherit clarity automatically

When you’re ready, next we can:

validate CPP v2 narratives against real players

or define exact sentence templates per narrative mode
