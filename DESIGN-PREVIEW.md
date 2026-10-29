# DivinePilgrim sacred-journey preview

A homepage and navigation redesign built around warm ivory, deep plum and muted gold. Existing sacred artwork is optimized into local WebP assets. The opening features St. Peter’s Basilica, followed immediately by Today’s Promise and its existing reflection audio control.

Five pilgrimage collections, the Scripture Challenge, Memory Coach, three prayer companions and both salvation-history tools remain reachable. The homepage no longer opens an onboarding modal over the initial experience. Navigation includes a labelled mobile menu, Home, Promise, Pilgrimages, Scripture and Prayer; additional destinations are available in the mobile menu and homepage sections.

Light and dark appearances, reduced motion, keyboard focus and responsive phone layouts are supported. The inner pilgrimage/prayer screens retain their current designs; this first stage establishes the homepage direction. No backend or voice-provider settings change, and audio remains user initiated.

Validation: production build, seven backend tests and targeted ESLint checks pass (one existing unused-variable warning in the reflection player). Browser checks cover the opening, Promise, collection image loading, pilgrimage navigation, mobile menu and dark appearance. Preview branch only; production is not changed.
