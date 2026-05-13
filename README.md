# DataLens – AI Powered Generic CSV Analytics Dashboard

## Team

- **Member 1:** Muhammad Ali Aatif (23I-4552)
  - Frontend Development
  - Dashboard UI/UX
  - Chart Integration
  - AI Assistant Interface

- **Member 2:** Shamoon Jan Aurakzai (22I-0724)
  - Backend Development
  - FastAPI APIs
  - Data Profiling Logic
  - Dashboard Generation

- **Member 3:** Minhaaj Saqib (22I-5006)
  - Dataset Engineering
  - Testing
  - Analytics Validation
  - Documentation Support

### Assigned Dataset
E-commerce | Brazilian E-commerce (Olist) | ~100K Orders

---

# Project Purpose

DataLens is an AI powered generic CSV analytics platform that automatically analyzes uploaded datasets and generates interactive dashboards, charts, KPI insights, executive summaries, and AI assisted dataset explanations.

The system is designed to work on generic CSV datasets rather than only one fixed dataset. Users can upload datasets and instantly receive automated insights, filtering capabilities, visual analytics, and AI generated summaries without manually creating dashboards.

The project combines:
- FastAPI backend services
- React frontend dashboard
- Dynamic chart rendering
- AI style dataset summarization
- Interactive filtering and analytics

---

# Core Features

## Generic CSV Dataset Support
- Works with uploaded CSV datasets dynamically
- Automatically detects:
  - Numeric columns
  - Categorical columns
  - Missing values
  - KPIs
  - Distributions

## AI Executive Summary
- Generates automatic dataset level summaries
- Identifies:
  - Dataset dimensions
  - Data quality issues
  - KPI candidates
  - Segmentation opportunities

## AI Chat Assistant
Users can ask questions such as:
- How many rows exist?
- Which columns contain missing values?
- What are the KPIs?
- Which columns are categorical?
- Dataset summary requests

## Interactive Dashboard
Automatically generates:
- KPI Cards
- Missing value charts
- Distribution charts
- Categorical analysis
- Dataset insights

## Global Filters
- Dynamic filter column selector
- Dynamic filter value selector
- Dashboard wide filtering
- Real time chart updates

## Dynamic Visualization
Supports:
- Bar charts
- Line charts
- KPI metrics
- Distribution analysis

---

# Technology Stack

## Backend
- Python
- FastAPI
- Pandas
- SQLite

## Frontend
- React
- Vite
- Recharts
- Axios

---

# System Architecture

## Backend Responsibilities
- Dataset ingestion
- Data profiling
- KPI generation
- AI summary generation
- Dynamic dashboard APIs
- Dataset filtering

## Frontend Responsibilities
- Dashboard rendering
- Interactive filters
- Chart visualization
- AI assistant UI
- Executive summary display

---

# API Endpoints

## Dataset Upload
```http
POST /datasets/upload