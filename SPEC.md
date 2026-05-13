# SPEC: DataLens

---

# 1. Objective

## What is DataLens?

DataLens is an AI-powered business intelligence and analytics web application that allows users to upload CSV datasets, automatically profile and visualize the data, interact with the dataset using natural language through a Large Language Model (LLM), and generate executive-level business summaries.

The application is designed to simplify exploratory data analysis and business reporting for users who may not possess advanced technical or programming expertise.

Although the system is designed to support generic CSV datasets, the primary development and demonstration dataset for this project is the Brazilian E-commerce Public Dataset by Olist.

---

## Target User

The target users are:
- Business analysts
- E-commerce operations managers
- Market researchers
- Non-technical decision-makers
- Students and researchers performing exploratory analytics

The system is specifically optimized for users who need rapid insights from structured business datasets without manually writing SQL queries or analytical code.

---

## Success Criteria

A successful implementation means:

- Users can upload CSV files up to 50MB
- Data profiling completes within 10 seconds for datasets under 100K rows
- Dashboard automatically generates at least 4 visualizations
- Filters update visualizations dynamically
- LLM chat can answer dataset-grounded questions
- Executive summary generates within 30 seconds
- Data persists using SQLite
- Application supports uploading a new dataset without restarting the application

---

## User Stories

- As a business analyst, I want to upload a CSV dataset so I can quickly analyze sales trends.
- As an operations manager, I want automated visualizations so I can identify business patterns without manual dashboard creation.
- As a non-technical user, I want to ask questions in plain English so I can retrieve insights without SQL knowledge.
- As a researcher, I want generated executive summaries so I can accelerate reporting workflows.

---

## Assumptions

1. Uploaded datasets are structured CSV files with headers.
2. Users upload one dataset at a time.
3. Datasets fit within local machine memory constraints.
4. Internet connectivity is available for Gemini API calls.
5. Users operate the application locally during grading.
6. The application is not intended for production deployment.

---

# 2. Tech Stack

| Component | Technology |
|---|---|
| Frontend Framework | React + Vite |
| Styling | Tailwind CSS |
| UI Components | Shadcn UI |
| Chart Library | Recharts |
| Backend Framework | FastAPI |
| Data Validation | Pydantic |
| Python Version | Python 3.11+ |
| Package Manager | uv |
| Database | SQLite |
| ORM | SQLAlchemy |
| Data Processing | Pandas |
| LLM Provider | Google Gemini |
| LLM Integration | Tool Calling / Function Calling |
| Backend Testing | pytest |
| Frontend Testing | Vitest |
| Coding Agent | Antigravity |
| State Management | Zustand |

---

# 3. Commands

```bash
Setup Backend:
uv sync

Run Backend:
uv run uvicorn backend.app.main:app --reload --port 8000

Setup Frontend:
cd frontend
npm install

Run Frontend:
npm run dev

Run Backend Tests:
uv run pytest

Run Frontend Tests:
npm run test

Build Frontend:
npm run build