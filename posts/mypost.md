---
title: "A DAY IN THE LIFE"
date: "2025-10-04"
author: "Dallas Decuire"
---

<div style="text-align: center;">

### A DAY IN THE LIFE

YESSIRSKI
<br>
  
<video width="400" height="300" controls style="display: block; margin: 0 auto;">
  <source src="/videos/kirby.mp4" type="video/mp4">
  Your browser does not support the video tag OK.
</video>

<img src="/images/kirby_run1.png" alt="Kirby" title="Sunset over the ocean" style="display: block; margin: 0 auto;">
<img src="/images/waddle5.png" alt="Waddle" title="Sunset over the ocean" style="display: block; margin: 0 auto;">

FYTMB MF OK

## Code
```csharp
using System;
using Sandbox;

public class Player: Component
{
	[Property] float WalkSpeed {get; set;} = 10f;
	[Property] float RunSpeed {get; set;} = 20f;
	[Property] float Gravity = -200f;
  	[Property] public KirbyState CurrentState = KirbyState.Idle;  
}
```

</div>