## Team Dashboard Integration — v1.0  
## Philosophy  
Team Lens is the macro decision surface.  
It should be:  
* Scannable  
* Hierarchical  
* Visual  
* Action-oriented  
* Non-cluttered  
  
## Layout Structure  
## 1️⃣ Governance Summary (Top Banner)  
Display as a full-width top card.  
## Show:  
* Health Band (large)  
* Health Score (numeric)  
* Action Pressure  
* Recommended Posture  
## Visual Rules  

| Health Band | Color |
| ----------- | ----- |
| OK          | Green |
| WARNING     | Amber |
| CRITICAL    | Red   |
  
Action Pressure:  
* low → grey  
* medium → amber  
* high → red  
  
## 2️⃣ Flags Section  
If flags exist:  
Render compact alert card:  
Example:  
⚠ HIGH — DNP_STARTER (11 players affected)  
⚠ HIGH — DNP_STARTER (11 players affected)  
Then visually highlight affected players in squad grid.  
Highlight rule:  
If player_id ∈ flag.player_ids:  
* Add red border or icon badge.  
Do not duplicate players from flags.  
  
## 3️⃣ Squad Section  
Two blocks:  
## Starters  
Grid layout (11 players)  
## Bench  
Compact row below  
Each player card shows:  
* Name  
* Position  
* Status  
* Minutes OK indicator  
* CPP ceiling class badge  
No lens here. This is structural.  
  
## 4️⃣ Watchlist Section  
If populated:  
Render by position group.  
Compact cards.  
  
## 5️⃣ History Section  
Mini bar chart or list:  
* GW  
* Team Points  
* Percentile Rank  
Minimal.  
  
## 🚫 UI Must Not  
* Compute health band  
* Recalculate action pressure  
* Interpret flags  
* Infer squad risks  
* Duplicate governance logic  
All decisions come from backend.
