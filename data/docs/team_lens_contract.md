This is the only UI-facing team contract.

Top-Level Structure
{
  "team_id": number,
  "analysis_gameweek": number,

  "governance": {
    "health_score": number,
    "health_band": "OK" | "WARNING" | "CRITICAL",
    "performance_state": string,
    "performance_driver": string,
    "capital_efficiency_state": string,
    "action_pressure": "low" | "medium" | "high",
    "recommended_posture": string,
    "flags": [
      {
        "code": string,
        "severity": "LOW" | "MEDIUM" | "HIGH",
        "player_ids": number[]
      }
    ]
  },

  "squad": {
    "starters": Player[],
    "bench": Player[],
    "hold": Player[]
  },

  "watchlist": object,
  "history": object[],
  "diagnostic": object
}

## Key Rules

* squad is the only canonical player structure.
* governance.flags references players by player_ids.
* UI must resolve flag highlights using squad.
* Governance does not embed player objects.
* No UI logic should derive health states.
