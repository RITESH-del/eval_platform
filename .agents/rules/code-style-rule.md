---
trigger: always_on
---

Stack: React, React Router, Redux Toolkit, Mantine, tailwindcss

Rules:

* Use Mantine UI.
* Follow existing patterns; reuse before creating.
* Search codebase before generating.
* Don't modify root files.
* Shared code → ./shared.
* HTTP → ./shared/api/apiClient.js.
* No API calls in components.
* Global state → Redux Toolkit; local UI state → component state.
* Routes → routes.jsx; no feature-level routers.
* Use React.lazy() for pages/routes; Global Suspense already exists.

Feature Structure:
features/
└── <feature>/
├── api/
├── components/
├── hooks/
├── models/      # types, slices, thunks
├── Pages/
└── routes.jsx    


