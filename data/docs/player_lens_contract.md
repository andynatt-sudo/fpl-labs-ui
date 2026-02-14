{
  "player_id": number,
  "web_name": string,
  "profile": {...},
  "labels": string[],
  "narrative": string,
  "lens": {
    "analysis_gw": number,
    "current_gw": number,

    "intelligence": {
      "identity": {
        "player_id": number,
        "name": string,
        "position": "Goalkeeper" | "Defender" | "Midfielder" | "Forward",
        "team": string,
        "price": number,
        "ownership": number
      },
      "analysis_gameweek_data": {
        "points_per_game": number,
        "value_form": number,
        "recent_points": number | null,
        "xgi_per_90": number | null,
        "defensive_contribution": number
      },
      "current_gameweek_data": {
        "ep_this": number,
        "ep_next": number,
        "fixtures": {
          "opponent_team_code": number,
          "was_home": boolean,
          "fdr_next_n": number
        }
      }
    },

    "diagnostics": {
      "cpp_status": "MUST-HAVE" | "HOLD" | "WATCH",
      "validation_state": "validated" | "emerging",
      "form_trajectory": "accelerating" | "stable" | "declining",
      "risk_profile": {
        "rotation_risk": null,
        "injury_risk": null,
        "volatility": null
      },
      "team_context_modifier": null
    },

    "prediction": {
      "fixture_outlook": "easy" | "neutral" | "hard",
      "ep_trend_alignment": "aligned" | "neutral" | "underperforming",
      "ceiling_indicator": "high" | "moderate",
      "replacement_pressure": null
    },

    "transfer_options": {
      "better_variants": [],
      "value_variants": [],
      "upside_variants": [],
      "structural_swap_paths": []
    }
  }
}
