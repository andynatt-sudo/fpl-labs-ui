## Interaction Model  
## Dashboard → Sidebar  
* Clicking any player row opens a right-side slide-in panel.  
* Width: **30% of viewport**.  
* No next/previous navigation.  
* Close via:  
    * X button  
    * Click outside  
    * Escape key  
  
## Sidebar Layout Structure  
## Section 1 — Header  
From lens.intelligence.identity  
Display:  
* Player name (large)  
* Position + Team  
* Price  
* Ownership %  
  
## Section 2 — Status Badges (Horizontal Row)  
From:  
* diagnostics.cpp_status  
* diagnostics.validation_state  
* diagnostics.form_trajectory  
* prediction.ceiling_indicator  
Badge colors:  

| Value        | Color           |
| ------------ | --------------- |
| MUST-HAVE    | Green           |
| HOLD         | Blue            |
| WATCH        | Amber           |
| validated    | Emerald outline |
| emerging     | Violet outline  |
| accelerating | Green accent    |
| declining    | Red accent      |
| stable       | Grey            |
| high ceiling | Gold            |
| moderate     | Neutral         |
  
## Section 3 — Forward Outlook  
Display:  
* Fixture Outlook → easy / neutral / hard  
* EP Trend → aligned / neutral / underperforming  
Visual:  
* Easy → green  
* Neutral → grey  
* Hard → red  
  
## Section 4 — Performance Snapshot  
Display compact stat grid:  
* PPG  
* Value Form  
* EP This GW  
* EP Next GW  
* Opponent (code for now)  
* Home/Away  
* FDR value  
No charts for MVP.  
  
# 🚫 UI Must Not  
* Compute its own fixture difficulty  
* Infer validation state  
* Recalculate trends  
* Override backend classification  
Backend is authority.
