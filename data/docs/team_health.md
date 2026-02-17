## 🧠 Team Health (Governance Layer)  
**Purpose:**Team Health defines short-term system stability and risk posture.It does not recommend specific players.  
  
## 🔹 JSON Contract  
```

{
  "team_id": int,
  "analysis_gameweek": int,
  "current_gameweek": int,

  "health_score": int,
  "health_band": "EXCELLENT | OK | FRAGILE | AT RISK",

  "performance_state": "above | flat | below",
  "performance_driver": "VARIANCE | STRUCTURAL_STALL | AVAILABILITY_DRAG | POSITIVE_VARIANCE | BALANCED",
  "capital_efficiency_state": "stable | fragmented | concentrated",

  "action_pressure": "low | medium | high",
  "recommended_posture": "roll_transfer | selective_move | restructure",

  "flags": [
    {
      "code": str,
      "severity": "HIGH | MEDIUM",
      "players": [{ "player_id": int, "name": str }]
    }
  ]
}

```
  
## 🔹 Field Definitions  
```
analysis_gameweek

```
Last completed GW used for evaluation.  
```
current_gameweek

```
Live FPL GW (may be incomplete).  
  
```
health_score

```
0–100 structural stability score.  
  
```
health_band

```

| Score  | Band      |
| ------ | --------- |
| 85–100 | EXCELLENT |
| 70–84  | OK        |
| 50–69  | FRAGILE   |
| <50    | AT RISK   |
  
```
performance_state

```
Derived from points delta vs GW average (last 3 GWs).  

| Value | Meaning                            |
| ----- | ---------------------------------- |
| above | Consistently outperforming average |
| flat  | Near average                       |
| below | Underperforming average            |
  
Percentile rank is NOT used.  
  
```
performance_driver

```
Explains why performance_state exists.  

| Driver            | Meaning                           |
| ----------------- | --------------------------------- |
| VARIANCE          | Strong structure, unlucky returns |
| STRUCTURAL_STALL  | Weak ceiling / capital structure  |
| AVAILABILITY_DRAG | Injuries / minutes risk           |
| POSITIVE_VARIANCE | Overperformance vs expectation    |
| BALANCED          | No dominant signal                |
  
```
capital_efficiency_state

```

| State        | Meaning                         |
| ------------ | ------------------------------- |
| stable       | Capital distributed efficiently |
| fragmented   | Expensive low-ceiling assets    |
| concentrated | Heavy spend concentration       |
  
```
action_pressure

```
Risk urgency level.  

| Value  | Meaning                          |
| ------ | -------------------------------- |
| low    | Roll likely optimal              |
| medium | Controlled move advised          |
| high   | Structural intervention required |
  
```
recommended_posture

```
Risk stance only — NOT player advice.  

| Value          | Meaning                    |
| -------------- | -------------------------- |
| roll_transfer  | Hold, preserve flexibility |
| selective_move | Targeted improvement       |
| restructure    | Larger correction          |
  
```
flags

```
Structural warnings only.  
  
## 🔹 Explicit Non-Features  
Team Health does NOT:  
* Suggest players to buy/sell  
* Use percentile for governance  
* Compute pick_score  
* Override transfer logic  
* Evaluate individual players  
  
## 📘 2️⃣ TEAM DIAGNOSTIC — Updated Contract  
Update:  
```

team_diagnostic.md

```
  
## 🧠 Team Diagnostic (Narrative Layer)  
**Purpose:**Explain governance state. Does not compute governance.  
  
## 🔹 JSON Contract  
```

{
  "recent_performance": "above | flat | below",
  "recent_performance_explanation": str,

  "performance_attribution": str,
  "performance_attribution_explanation": str,

  "primary_driver": str,

  "fixture_context": "low | medium | high",

  "action_pressure": "low | medium | high",
  "recommended_posture": "roll_transfer | selective_move | restructure",

  "capital_efficiency": "stable | fragmented | concentrated"
}

```
  
## 🔹 Important Boundary  
Diagnostics:  
* Reads team_health  
* Does not compute posture  
* Does not compute performance_state  
* Does not compute capital efficiency  
  
## 📘 3️⃣ Gameweek Semantics (UI Section)  
Add to docs:  
  
## Gameweek Definitions  
* current_gameweek = Live FPL GW  
* analysis_gameweek = Last completed GW used for analytics  
Example:  
If GW26 is live:  
```

current_gameweek = 26
analysis_gameweek = 25

```
UI may display:  
“GW26 Dashboard (Based on GW25 Results)”  
“GW26 Dashboard (Based on GW25 Results)”  
  
## 📘 4️⃣ Removed Fields (Breaking Changes)  
Add a "Breaking Changes" section.  
  
## Removed From Team Health  
* summary  
* percentile-based performance classification  
* legacy health_report merge  
* team_form_summary  
* recent_gw_stats parameter  
  
## Removed From Diagnostics  
* internal posture computation  
* percentile-based recent performance classifier  
* governance logic  
  
## 📘 5️⃣ Architecture Diagram (Add To Docs)  
Add this section for other agents:  
```

CPP → Player classification
Team Health → Governance (risk posture)
Diagnostics → Explanation
Transfers → Candidate generation
Scoring → Player ranking
UI → Presentation

```
No cross-layer ownership.  
  
## 📘 6️⃣ Changelog For Other Agents  
Create:  
```

CHANGELOG_GOVERNANCE_REFACTOR.md

```
Include:  
  
## Governance Refactor (v3)  
## Structural Changes  
* Introduced points-delta performance model  
* Removed percentile governance dependency  
* Downgraded diagnostics to narrative-only  
* Separated player-level scoring from team-level health  
* Extracted enrichment logic from report_builder  
## New Invariants  
* Team Health owns posture  
* Diagnostics consumes posture  
* Scoring never reads governance  
* Governance never reads scoring  
## Required Agent Behaviour  
Agents must NOT:  
* Import team_health module directly  
* Compute posture outside Team Health  
* Use percentile for governance logic  
* Inject team_health fields into report dataframe  
