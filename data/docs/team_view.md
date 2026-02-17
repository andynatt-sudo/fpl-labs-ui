# Team View (v0)

Team View is a **weekly squad summary** designed to help users understand
the current state of their team at a glance.

It is:
- descriptive, not prescriptive
- calm by default
- stable across gameweeks

Team View does **not** suggest transfers or judge performance.
## Inputs

Team View is built from three upstream sources:

- **Report dataframe**
  - player ownership
  - starter / bench status
  - availability
  - CPP outputs (global player context)

- **Team Health**
  - squad-level fragility diagnosis

- **Entry context**
  - team_id (FPL entry id)
  - gameweek
## Output Schema (v0)

```json
{
  "team_id": 2310541,
  "gameweek": 26,

  "meta": {
    "health_band": "EXCELLENT",
    "health_score": 100
  },

  "summary": {
    "must_haves_owned": 2,
    "must_haves_missing": 4,
    "starters_at_risk": 0
  },

  "starters": [ /* player blocks */ ],
  "bench": [ /* player blocks */ ]
}

---

## 4️⃣ Player block (this is the most important section)

Be very explicit here.

```md
## Player Block

Each player in `starters` or `bench` has the following shape:

```json
{
  "player_id": 430,
  "name": "Haaland",
  "position": "Forward",
  "is_starter": true,

  "status": "HOLD",
  "minutes_ok": true,

  "cpp": {
    "status": "MUST-HAVE",
    "ceiling_class": "HIGH"
  }
}
## What’s New in v0

- CPP context is now attached to each player
- Global player importance is explicitly represented
- No changes to existing UI behaviour are required

## Future Extensions

Future versions may introduce:
- performance context
- pressure indicators
- richer diagnostics

These will be additive and will not override CPP or local status.

