# FPL Labs -- System Architecture

**Version:** 3.1\
**Status:** Production Baseline\
**Architecture Model:** Layered, Deterministic, Non-Circular\
**Core Principle:** Intelligence → Diagnostics → Prediction → Governance

------------------------------------------------------------------------

# 1. Architectural Overview

FPL Labs follows a strict layered architecture to prevent circular
logic, preserve governance integrity, and ensure deterministic outputs.

The system is divided into:

-   Data Layer
-   Intelligence Layer
-   Diagnostics Layer
-   Prediction Layer
-   Governance Layer
-   Execution Layer (Transfers)
-   Export Layer (Serialization Boundary)
-   UI Consumption Layer

Each layer has clearly defined responsibilities and may not override
logic from higher-authority layers.

------------------------------------------------------------------------

# 2. Data Layer

Sources:

-   players.csv (identity base)
-   playerstats.csv (performance + availability snapshot)
-   gameweek summaries
-   fixtures
-   bootstrap metadata

Responsibilities:

-   Raw ingestion only
-   No modelling
-   No classification
-   No transformation beyond normalization

------------------------------------------------------------------------

# 3. Intelligence Layer

Responsible for exposing structured performance metrics.

Examples:

-   points_per_game
-   value_form
-   xgi_per_90
-   ep_this / ep_next
-   fixture difficulty metrics

Intelligence exposes signals. It does not interpret them.

------------------------------------------------------------------------

# 4. Diagnostics Layer

Responsible for structural interpretation of intelligence signals.

Includes:

-   CPP status
-   validation_state
-   form_trajectory
-   risk_profile

Diagnostics must be:

-   Deterministic
-   Reproducible
-   Non-probabilistic
-   Non-circular

Diagnostics may not override governance state.

------------------------------------------------------------------------

# 5. Risk Pillar (Player Lens v2.1)

Lives within Diagnostics.

Provides:

-   injury_risk
-   rotation_risk
-   volatility

Constraints:

-   Deterministic classification
-   Uses only current_playerstats + report metrics
-   Does not override CPP classification
-   Does not alter projections

Risk contextualizes interpretation but does not dictate governance
posture.

------------------------------------------------------------------------

# 6. Prediction Layer

Provides forward interpretation based on intelligence + diagnostics.

Examples:

-   fixture_outlook
-   ep_trend_alignment
-   ceiling_indicator

Prediction may not override governance or structural posture.

------------------------------------------------------------------------

# 7. Governance Layer

Team Lens lives here.

Controls:

-   Squad posture
-   Structural alerts
-   Risk flags
-   Validation enforcement

Governance is authoritative. No lower layer may override governance
output.

------------------------------------------------------------------------

# 8. Execution Layer

Transfer engines:

-   Single transfers
-   Bundles
-   Tactical replacements

These consume lens outputs but do not modify them.

------------------------------------------------------------------------

# 9. Export Layer (Serialization Boundary)

The Export Layer converts internal Python objects into valid JSON
artifacts.

Rules:

-   No modelling logic
-   No governance logic
-   No mutation of analytical values

## JSON Serialization Constraints

All exported JSON must comply with RFC standards.

Rules:

-   NaN values must be converted to null
-   json.dump(..., allow_nan=False) must be enforced
-   Export layer is responsible for sanitation
-   Modelling layers must not alter values solely for serialization

This protects UI integrity and schema stability.

------------------------------------------------------------------------

# 10. Player Surfaces

## player_profiles.json

Presentation layer.

-   Identity
-   Injury structure
-   Narrative
-   Profile summary

Lightweight and UI-first.

## player_lens.json

Analytics layer.

-   Intelligence
-   Diagnostics
-   Prediction
-   Transfer options

Loaded lazily in UI.

------------------------------------------------------------------------

# 11. Team Surface

team_lens.json is the single source of truth for:

-   Squad composition
-   Governance state
-   Projection aggregation

Replaces team_view.json and team_health.json.

------------------------------------------------------------------------

# 12. Non-Circularity Rules

1.  Risk must not override CPP.
2.  Prediction must not override Governance.
3.  Transfer engines may not alter lens outputs.
4.  Export must not compute analytics.
5.  UI must not perform modelling.

------------------------------------------------------------------------

# 13. Version History

## v3.1

-   Formalized Player Risk Pillar integration
-   Introduced JSON sanitation boundary rules
-   Confirmed separation of presentation and analytics surfaces
-   Deprecated legacy team_view and team_health outputs

## v3.0

-   Initial layered architecture definition
-   Multi-lens separation
-   Governance-first model established

------------------------------------------------------------------------

# End of Architecture Specification
