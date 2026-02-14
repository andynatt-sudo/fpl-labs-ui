# team_view.json — Team Decision View

## Purpose

`team_view.json` provides a **human-readable, decision-oriented snapshot** of the current FPL team.  
It is designed to answer:

> “What is the state of my squad right now, and do I need to act?”

This file is **not a prediction engine** and **does not recommend transfers by default**.  
Its role is **context, framing, and risk awareness**.

---

## What question this JSON answers

- Is my team stable or under pressure?
- Are there any forced actions this week?
- Which players are safe to ignore?
- What should I be paying attention to, and why?
- Why might this feel like a “quiet” or frustrating week?

---

## What this JSON explicitly does NOT answer

- Who to buy or sell next
- Optimal transfers or captain choices
- Expected points forecasts
- Long-term squad planning

Those concerns live in **transfer**, **bundle**, or **watchlist** outputs.

---

## Mental model

Think of `team_view.json` as a **weekly briefing**, not a shopping list.

A human should read it in this order:

1. Start with **team diagnostics** to understand the week
2. Scan **structural notes** to see where pressure comes from
3. Review the squad **by position** for stability and risk
4. Use **HOLD** and **WATCHLIST** only as supporting context

If nothing feels urgent, that is a **valid and intentional outcome**.

---

## Diagnostic consumption rules


- `recent_performance`, `primary_driver`, `action_pressure`, and `recommended_posture` are scan-level diagnostic labels. They should be rendered compactly (tags, badges, or short lines).
- Explanatory text such as `capital_efficiency.summary` is read-level context. It should support the labels, not replace them, and should not dominate the layout.
- The diagnostic exists to prime how the squad should be read, not to instruct action.

---

## Primary vs secondary signals

### Primary signals (decision framing)

These explain *whether* action is required.

- `team_diagnostic`
- `summary`
- Player `status`
- `minutes_ok`
- `fixture_stress`

### Secondary signals (contextual)

These explain *why* action may or may not be attractive.

- `structural_notes`
- `hold`
- `watchlist`

---

### fixture_context

**Definition**  
A qualitative summary of how difficult upcoming fixtures are for the starting XI.

Values:
- `low`
- `medium`
- `high`

**Draws attention to**  
Situations where many starters are simultaneously facing tough opposition.

**Should not be used for**  
Triggering transfers or evaluating individual players.

---

## team_gw_history

**Definition**  
A rolling record of actual team gameweek outcomes sourced from the official FPL API.

**Draws attention to**  
How the last few weeks *felt* to the manager.

**Should not be used for**  
Predicting future points or evaluating individual players.

** Summary **
`percentile_rank` tells you how your week felt compared to everyone else, not how strong your team is — and we store it for context, not decisions.




## performance_attribution (CR-2)

**Definition**  
A single dominant explanation for *why* the team is under- or over-performing when player-level advice is predominantly `HOLD`.

This diagnostic exists to explain **contextual frustration or momentum**, not to suggest action.

**Values**
- `STRUCTURAL_STALL`
- `FIXTURE_CLUSTER`
- `VARIANCE`
- `CAPTAINCY_DRAG`
- `PLAYER_SPECIFIC`

Exactly **one** value is always present.

---

### Attribution categories

#### STRUCTURAL_STALL
**Meaning**  
The squad is stable but lacks explosive upside.

**Typically caused by**
- Many `HOLD` players
- Few high-ceiling roles
- No obvious short-term upgrade paths

**Draws attention to**  
Structural limits on short-term growth.

**Should not be used for**  
Forcing transfers or breaking a stable core.

---

#### FIXTURE_CLUSTER
**Meaning**  
A large proportion of starters are simultaneously facing difficult fixtures.

**Typically caused by**
- High aggregated fixture difficulty (`fixture_norm`)
- Suppressed returns across multiple players at once

**Draws attention to**  
Why good players are under-delivering together.

**Should not be used for**  
Downgrading player quality or long-term evaluation.

---

#### VARIANCE
**Meaning**  
Recent performance is noisy with no dominant underlying cause.

**Typically caused by**
- Mixed gameweek outcomes
- No consistent trend
- No clear structural or contextual blocker

**Draws attention to**  
Normal short-term randomness.

**Should not be used for**  
Narrative over-interpretation or reactionary moves.

---

#### CAPTAINCY_DRAG
**Meaning**  
Repeated underperformance relative to the field driven by captain choices.

**Typically caused by**
- Multiple low percentile gameweeks
- Captain scores lagging popular picks

**Draws attention to**  
Why total points feel low despite a stable squad.

**Should not be used for**  
Rebuilding the team or changing core structure.

---

#### PLAYER_SPECIFIC
**Meaning**  
One or two players are materially blocking returns due to minutes, role, or form validation issues.

**Typically caused by**
- Minutes continuity failures
- Short-run validation failures
- Isolated underperformers in key slots

**Draws attention to**  
Localised issues rather than team-wide problems.

**Should not be used for**  
Broad conclusions about team health.

---

### Relationship to other diagnostics

- `recent_performance` explains **what has happened**
- `performance_attribution` explains **why it feels that way**
- `fixture_context` qualifies **severity**, not cause
- `action_pressure` and `recommended_posture` remain the only action-framing fields

When `HOLD` dominates player advice, **performance_attribution is the primary explanatory layer**.

---

### Design intent

- `performance_attribution` is **diagnostic, not prescriptive**
- It does **not** override `HOLD`
- It does **not** trigger transfers
- It exists to maintain **user trust and narrative clarity**

If nothing feels actionable, the attribution explains *why waiting is correct*.


## recent_performance (CR-3)

**Definition**  
A trust-aligned summary of how the team has performed over the last five gameweeks, expressed in emotionally neutral language.

This label is computed **strictly from the 5-GW perception window** and is designed to reflect *lived manager experience*, not technical overperformance.

**Values**
- `above_average`
- `flat`
- `mixed`
- `below_average`

Each label is accompanied by a short explanation field:  
`recent_performance_explanation`.

---

### How to read recent_performance

- `above_average` is intentionally rare and only appears when recent performance has clearly beaten the field.
- `flat` represents stable but unspectacular performance and is expected to be the most common state.
- `mixed` reflects uneven results that combine good and frustrating weeks.
- `below_average` indicates a sustained run of poor results that most managers would experience negatively.

**Draws attention to**  
How the recent run of gameweeks *felt* relative to expectations.

**Should not be used for**  
Predicting future performance or forcing transfers.

---

### Relationship to other diagnostics

- `recent_performance` explains **what has happened**
- `recent_performance_explanation` clarifies the label in plain language
- `performance_attribution` explains **why it feels that way**
- `fixture_context` qualifies **severity**, not cause
- `action_pressure` and `recommended_posture` remain the only action-framing fields

---

### Design intent

- Labels and explanations are **diagnostic, not prescriptive**
- Explanations are designed to reduce trust breaks
- No explanation implies required action

If nothing feels actionable, the diagnostics explain *why waiting is correct*.



---

## capital_efficiency (CR-4)

**Definition**  
A diagnostic summary explaining how effectively squad value is positioned to generate upside.

This diagnostic exists to explain why a team can feel *stuck* even when there are no obvious sell candidates or injury issues.

**States**
- `EFFICIENT`
- `COMPRESSED`
- `FRAGMENTED`

Each state is accompanied by a short explanation field:  
`capital_efficiency.summary`.

---

### Capital efficiency states

#### EFFICIENT
**Meaning**  
Squad value is largely deployed in roles with realistic short-term upside.

**Typically caused by**
- Meaningful presence of high-ceiling profiles
- Balanced mix of `HOLD` and `WATCH` players

**Draws attention to**  
A team that is structurally positioned to benefit from form or fixture swings.

**Should not be used for**  
Assuming guaranteed returns or forcing aggressive restructuring.

---

#### COMPRESSED
**Meaning**  
Squad value is safe but capped, with a large share tied up in low-upside roles.

**Typically caused by**
- High concentration of `HOLD` players
- Prevalence of low-ceiling profiles

**Draws attention to**  
Why progress feels slow despite squad stability.

**Should not be used for**  
Interpreting the team as fragile or broken.

---

#### FRAGMENTED
**Meaning**  
Squad value is spread across mixed profiles, limiting both stability and upside.

**Typically caused by**
- High share of low-ceiling players
- No clear concentration of stable `HOLD` value

**Draws attention to**  
Why the squad feels awkward or directionless despite having no clear problems.

**Should not be used for**  
Identifying specific sell candidates or triggering immediate action.

---

### Relationship to other diagnostics

- `recent_performance` explains **how recent weeks have felt**
- `performance_attribution` explains **why that feeling exists**
- `capital_efficiency` explains **why progress may feel capped or unfocused**

Capital efficiency is **contextual**, not prescriptive, and should be read alongside other team diagnostics.




## Top-level sections

### summary

High-level numerical indicators for the current squad.

Example:
\`\`\`json
{
  "starter_minutes_risk": 0,
  "availability_risk": 0,
  "free_transfers": 1,
  "bank": 1.2
}
