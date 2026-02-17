## 📘 FPL Labs – Multi-Lens Schema Specification  
**Version:** 2.1**Status:** Production Baseline**Architecture Principle:** Intelligence → Diagnostics → Prediction**Scope:** Player Lens, Team Lens, Dashboard Lens**Governance Model:** Non-circular, deterministic, export-safe  
  
## 1. Architectural Philosophy  
FPL Labs separates analytical outputs into structured “lenses”:  
* **Player Lens** → Individual player intelligence surface  
* **Team Lens** → Squad governance + structural posture  
* **Dashboard Lens** → Presentation wrapper for UI  
* **Transfer Engines** → Strategic execution layer  
Each lens follows:  
```

Intelligence → Diagnostics → Prediction

```
No lens may override governance state outside its scope.  
  
## 2. Player Surfaces  
Player data is split into two surfaces:  
## 2.1 player_profiles.json (Presentation Layer)  
Lightweight identity and narrative surface.  
```

{
  player_id
  web_name
  full_name
  team
  team_code
  position
  price
  ownership
  injury {
    state
    chance_next_gw
    news
  }
  profile {
    role
    minutes
    scoring
    reliability
  }
  labels[]
  narrative
}

```
This file:  
* Is UI-first  
* Contains no analytics  
* Contains no predictive modelling  
* Is stable and lightweight  
  
## 2.2 player_lens.json (Analytics Layer)  
Keyed by player_id.  
```

{
  "player_id": {
    analysis_gw
    current_gw
    intelligence { ... }
    diagnostics { ... }
    prediction { ... }
    transfer_options { ... }
  }
}

```
This file:  
* Is analytics-first  
* May grow in size  
* Is loaded lazily in UI  
* Contains no presentation duplication  
  
## 3. Player Lens Schema  
## 3.1 Intelligence Layer  
Raw and derived metrics.  
```

intelligence {
  analysis_gameweek_data {
    points_per_game
    value_form
    recent_points
    xgi_per_90
    defensive_contribution
  }

  current_gameweek_data {
    ep_this
    ep_next
    fixtures {
      opponent_team_code
      was_home
      fdr_next_n
    }
  }
}

```
Intelligence does not interpret — it exposes signals.  
  
## 3.2 Diagnostics Layer  
Structured classification.  
```

diagnostics {
  cpp_status
  validation_state
  form_trajectory
  risk_profile {
    injury_risk
    rotation_risk
    volatility
  }
}

```
Diagnostics interprets Intelligence without forecasting.  
  
## 3.3 Risk Pillar (v2.1)  
The Risk Pillar provides contextual stability signals.  
It must:  
* Be deterministic  
* Use only existing playerstats fields  
* Never override CPP classification  
* Never modify governance logic  
## Categories  
```

injury_risk    → out | high | moderate | low | unknown
rotation_risk  → high | moderate | low | unknown
volatility     → high | moderate | low | unknown

```
## Interpretation  
* **Injury Risk** → Availability probability  
* **Rotation Risk** → Start consistency / minutes reliability  
* **Volatility** → Performance distribution stability  
Risk contextualizes output.Risk does not change structural posture.  
  
## 3.4 Prediction Layer  
Forward-facing interpretation.  
```

prediction {
  fixture_outlook
  ep_trend_alignment
  ceiling_indicator
}

```
Prediction may reference Intelligence and Diagnostics.Prediction may not override Governance.  
  
## 3.5 Transfer Options Layer  
Strategic suggestions.  
```

transfer_options {
  better_variants[]
  value_variants[]
  upside_variants[]
  structural_swap_paths[]
}

```
Optional and contextual.May be empty.Always structurally present.  
  
## 4. Team Lens  
Team Lens is the governance surface.  
```

team_lens {
  squad { starters[], bench[] }
  governance {
    posture
    risk_flags[]
    structural_alerts[]
  }
  projection { ... }
}

```
Team Lens:  
* Controls governance state  
* Does not depend on Player Lens predictions  
* Aggregates but does not mutate player-level outputs  
  
## 5. Dashboard Lens  
Dashboard is presentation-only.  
* Consumes player_profiles.json  
* Consumes team_lens.json  
* Loads player_lens.json on demand  
* Contains no modelling logic  
  
## 6. Serialization Rules  
All exported JSON must comply with RFC JSON standards.  
Rules:  
* NaN → null  
* json.dump(..., allow_nan=False)  
* Export layer handles sanitation  
* Modelling layers remain untouched  
This prevents UI instability and schema corruption.  
  
## 7. Governance Constraints  
1. No circular logic between CPP and Risk.  
2. Risk does not alter projections.  
3. Prediction does not override Governance.  
4. Transfer engines read lenses but do not modify them.  
5. All lenses are deterministic and reproducible.  
  
## 8. Version History  
## v2.1  
* Introduced deterministic Risk Pillar  
* Split presentation and analytics surfaces  
* Formalised JSON sanitation rules  
* Removed unused diagnostic scaffolding  
## v2.0  
* Introduced multi-lens separation  
* Formalised Player Diagnostics and Prediction layers  
  