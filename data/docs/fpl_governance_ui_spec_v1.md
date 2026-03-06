# FPL Governance Engine -- UI Integration Specification (v1.0)

## Purpose

This document defines how the **UI layer** should consume and present
the governance signals produced by the FPL Governance Engine.\
The UI should **not recompute any analytics**. It should only **render
the values provided by the backend**.

The governance engine produces three core pressure layers:

1.  Structural pressure (squad stability)
2.  Competitive pressure (recent performance)
3.  Overall pressure (combined managerial pressure)

These signals drive the **Team Status panel**, **alerts**, and future
**decision support tools**.

------------------------------------------------------------------------

# Data Source

UI should read governance signals from:

`team_lens.json`

Path:

    team_lens -> governance

Example structure:

\`\`\` json
"governance": {
  "team_id": 2310541,
  "gameweek": 28,
  "health_score": 80,
  "health_status": "OK",
  "structural_pressure_score": 20,
  "competitive": {
    "lookback_used": 5,
    "gw_deltas": [-3, -1, -13, -8, 14],
    "rolling_delta": -2.2,
    "negative_weeks": 4,
    "severe_weeks": 2,
    "competitive_pressure_score": 55.2,
    "competitive_state": "critical_underperformance"
  },
  "overall_pressure_score": 41.1,
  "warning_level": "alert",
  "flags": []
}
\`\`\`

------------------------------------------------------------------------

# Key UI Fields

## 1. Health Status

**Field**

    health_status

Possible values:

  Value       Meaning
  ----------- ----------------------------
  EXCELLENT   Squad highly stable
  OK          Normal operating condition
  FRAGILE     Squad instability emerging
  AT RISK     Major structural issues

UI should display this as **Structural Status**.

------------------------------------------------------------------------

## 2. Structural Pressure

**Field**

    structural_pressure_score

Range:

    0 – 100

Interpretation:

  Score     UI Label
  --------- -----------------
  0--20     Stable
  20--40    Minor risk
  40--60    Fragile
  60--100   Structural risk

Suggested UI:

-   Small pressure gauge
-   Squad stability indicator

------------------------------------------------------------------------

## 3. Competitive Performance

Located under:

    governance.competitive

Key fields:

  Field                        Meaning
  ---------------------------- -----------------------------------
  rolling_delta                Avg points vs field (last N GWs)
  gw_deltas                    Per-week performance vs field
  negative_weeks               Count of negative weeks
  severe_weeks                 Weeks worse than -8
  competitive_state            Performance classification
  competitive_pressure_score   Pressure derived from performance

Possible competitive states:

  State                       Meaning
  --------------------------- ----------------------------
  outperforming               Strong positive form
  stable_positive             Mild positive trend
  neutral                     No clear trend
  underperforming             Sustained negative trend
  critical_underperformance   Severe performance decline

------------------------------------------------------------------------

# 4. Competitive Pressure Score

**Field**

    competitive_pressure_score

Range:

    0 – 100

Interpretation:

  Score     UI Meaning
  --------- -------------------------------
  0--20     Strong form
  20--40    Stable
  40--60    Pressure building
  60--80    Major pressure
  80--100   Critical performance collapse

Suggested UI:

-   Performance pressure meter
-   Tooltip showing last 5 deltas

Example tooltip:

    Last 5 GWs vs field:
    -3, -1, -13, -8, +14
    Rolling delta: -2.2

------------------------------------------------------------------------

# 5. Overall Pressure Score

**Field**

    overall_pressure_score

Calculation:

    0.6 * competitive_pressure
    +
    0.4 * structural_pressure

This represents **managerial pressure**.

Range:

    0 – 100

Interpretation:

  Score     Meaning
  --------- ---------------
  0--20     Fully stable
  20--40    Mild pressure
  40--60    Watch
  60--80    Alert
  80--100   Critical

Suggested UI element:

-   Main **Team Pressure Gauge**
-   Central governance indicator

------------------------------------------------------------------------

# 6. Warning Level

**Field**

    warning_level

Values:

  Value      UI Meaning
  ---------- ---------------------------
  green      No action required
  watch      Monitor situation
  alert      Consider intervention
  critical   Immediate action required

This field drives **top-level status indicators**.

------------------------------------------------------------------------

# 7. Structural Flags

**Field**

    flags

Example:

\`\`\` json
{
 "code": "INJURY_RISK",
 "severity": "HIGH",
 "player_ids": [430]
}
\`\`\`

Possible flag types:

  Code                 Meaning
  -------------------- ---------------------
  DNP_STARTER          Starter not playing
  INJURY_RISK          Player injury risk
  CAPITAL_FRAGMENTED   Budget inefficiency

UI should display flags in:

-   Squad health panel
-   Player availability indicators

------------------------------------------------------------------------

# UI Layout Recommendation

## Governance Panel

    TEAM STATUS
    --------------------------------
    Health Status
    Structural Pressure
    Competitive Pressure
    Overall Pressure
    Warning Level

## Performance Panel

    LAST 5 GAMEWEEKS
    Δ vs field: [-3, -1, -13, -8, +14]
    Rolling Δ: -2.2

## Structural Panel

    Injuries
    Availability flags
    Capital efficiency

------------------------------------------------------------------------

# Important Rules for UI

1.  **Never recompute metrics in UI**
2.  UI must treat governance engine as **single source of truth**
3.  Scores should be visualized but not altered
4.  Tooltips should explain values clearly

------------------------------------------------------------------------

# Version

    Governance Engine UI Spec
    Version: 1.0
