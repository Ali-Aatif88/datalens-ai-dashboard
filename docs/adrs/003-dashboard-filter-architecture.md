# ADR-003: Dashboard Filter and Visualization Architecture

---

## Status

Accepted

## Date

2026-05-12

---

## Context

One of the primary goals of DataLens was to create a dynamic analytics dashboard capable of supporting generic CSV datasets rather than a single fixed schema.

The system needed:
- Automatic dashboard generation
- Dynamic filtering
- Real time chart updates
- Generic dataset compatibility
- Flexible frontend rendering
- Backend driven visualization APIs

The dashboard architecture needed to work for:
- Olist e-commerce analytics
- Generic uploaded datasets
- Dynamic KPI generation
- Interactive business exploration

A key architectural challenge involved determining how filters should propagate across charts and dashboard components.

---

## Options Considered

### Option 1: Frontend Only Filtering

All filtering logic handled directly in React frontend state.

**Pros:**
- Fast UI responsiveness
- Reduced backend calls

**Cons:**
- Increased frontend complexity
- Difficult generic dataset scaling
- Harder synchronization across analytics components

---

### Option 2: Backend Driven Filtering

Filtering logic handled centrally in backend APIs.

**Pros:**
- Centralized analytics logic
- Easier generic dataset support
- Cleaner frontend architecture
- Better consistency across charts

**Cons:**
- Additional API requests
- Slightly increased backend load

---

### Option 3: Hybrid Filtering

Combination of frontend and backend filtering.

**Pros:**
- Flexible architecture
- Reduced API calls for some operations

**Cons:**
- More complex synchronization
- Harder debugging
- Increased architectural complexity

---

## Decision

**We chose backend driven filtering.**

The backend driven architecture simplified dashboard synchronization and allowed the application to support arbitrary datasets more effectively.

The backend APIs generate filtered dashboard analytics dynamically, while the frontend focuses primarily on rendering visualizations and handling user interaction.

This architecture improved maintainability and reduced frontend logic complexity.

---

## Trade-offs

- We accepted additional API requests between frontend and backend.
- Some dashboard interactions may have slightly higher latency.
- We prioritized maintainability and generic dataset support over ultra low latency filtering.

If future scalability requirements increase, selective frontend caching could be added.

---

## Consequences

- The backend became responsible for dataset filtering logic.
- Dashboard charts remain synchronized consistently.
- Generic CSV analytics became easier to support dynamically.

---

## References

- frontend/src/App.jsx
- backend/app/main.py
- Recharts Documentation
- FastAPI Documentation