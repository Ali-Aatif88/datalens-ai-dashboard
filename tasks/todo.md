# DataLens Task Breakdown

## T001 — Backend Environment Setup
- Install FastAPI and backend dependencies
- Configure uv environment
- Create backend app structure
- Verify backend runs on port 8000

Acceptance Criteria:
- Backend starts successfully
- `/health` endpoint responds

---

## T002 — Frontend Environment Setup
- Install React frontend dependencies
- Configure Tailwind CSS
- Configure Shadcn UI
- Verify frontend runs on port 5173

Acceptance Criteria:
- Frontend renders successfully

---

## T003 — CSV Upload System
- Create CSV upload endpoint
- Validate file type and size
- Store uploaded CSV metadata

Acceptance Criteria:
- CSV uploads successfully
- Invalid files rejected properly

---

## T004 — SQLite Persistence
- Configure SQLite database
- Persist uploaded dataset information
- Store profiling metadata

Acceptance Criteria:
- Data persists after refresh

---

## T005 — Data Profiling Engine
- Generate row count
- Generate column statistics
- Detect numeric/categorical/date columns
- Generate missing value statistics

Acceptance Criteria:
- Profiling results generated successfully

---

## T006 — Dashboard Visualizations
- Create automatic charts
- Add KPI cards
- Add summary statistics

Acceptance Criteria:
- Minimum 4 visualizations render correctly

---

## T007 — Global Filtering
- Add dashboard filters
- Sync filters across visualizations

Acceptance Criteria:
- Charts update dynamically when filters change

---

## T008 — Olist Master Dataset
- Merge Olist CSV files
- Create flattened dataset
- Validate merged schema

Acceptance Criteria:
- `olist_master.csv` created successfully

---

## T009 — Gemini LLM Integration
- Configure Gemini API
- Add tool-calling architecture
- Add backend AI query tools

Acceptance Criteria:
- Chat answers dataset questions correctly

---

## T010 — Executive Summary Generator
- Generate AI-powered dataset summary
- Generate KPI observations

Acceptance Criteria:
- Executive summary renders successfully

---

## T011 — Geographic Visualization
- Add map visualization
- Display orders by state/city

Acceptance Criteria:
- Geographic charts render successfully

---

## T012 — Time-Series Forecasting
- Create sales trend analysis
- Add simple forecasting

Acceptance Criteria:
- Forecast chart displays correctly

---

## T013 — NLP Review Analysis
- Analyze review comments
- Generate sentiment overview

Acceptance Criteria:
- NLP insights display correctly

---

## T014 — MCP Integration
- Create MCP tools
- Expose analytics tools

Acceptance Criteria:
- MCP server responds correctly

---

## T015 — Backend Testing
- Add pytest coverage

Acceptance Criteria:
- Minimum 10 backend tests pass

---

## T016 — Frontend Testing
- Add Vitest coverage

Acceptance Criteria:
- Minimum 5 frontend tests pass

---

## T017 — Documentation and ADRs
- Complete README
- Write ADRs
- Finalize report

Acceptance Criteria:
- Documentation complete and professional