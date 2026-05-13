# DataLens – AI Powered Generic CSV Analytics Dashboard

## Overview

DataLens is an AI powered generic CSV analytics dashboard that automatically analyzes uploaded datasets and generates interactive visual dashboards, KPI summaries, AI generated executive insights, and intelligent dataset question answering.

Unlike traditional dashboards designed for one fixed dataset, DataLens supports generic CSV uploads and dynamically profiles datasets to create analytics automatically.

The system combines:
- FastAPI backend services
- React frontend dashboard
- Dynamic chart rendering
- AI assisted analytics
- SQLite persistence
- Interactive filtering and insights

---

# Team Members

| Name | Roll Number | Responsibilities |
|------|------|------|
| Muhammad Ali Aatif | 23I-4552 | Frontend Development, Dashboard UI/UX, AI Chat Interface |
| Shamoon Jan Aurakzai | 22I-0724 | Backend APIs, FastAPI Services, Data Profiling Logic |
| Minhaaj Saqib | 22I-5006 | Dataset Engineering, Testing, Documentation |

---

# Assigned Dataset

Dataset Used:
- Brazilian E-Commerce Public Dataset by Olist

Dataset Characteristics:
- ~100,000 orders
- Customer data
- Product categories
- Payment information
- Reviews
- Geographic order information

The dataset was used to demonstrate:
- Revenue analytics
- State-wise sales analysis
- Product category insights
- Delivery performance analysis
- AI powered recommendations

---

# Project Objectives

The primary objectives of DataLens were:

- Build a generic CSV analytics platform
- Automatically profile uploaded datasets
- Generate dynamic dashboards
- Create AI powered executive summaries
- Build an intelligent dataset assistant
- Support business level analytics without manual dashboard design

---

# Core Features

## 1. Generic CSV Upload
Users can upload any CSV dataset dynamically.

Supported capabilities:
- Automatic schema detection
- Missing value analysis
- Numeric and categorical column detection
- Dataset persistence

---

## 2. Automated Data Profiling

The backend automatically generates:
- Row and column counts
- Missing value statistics
- Numeric summaries
- Categorical analysis
- KPI candidates

---

## 3. AI Executive Summary

DataLens generates management level executive summaries including:
- Business insights
- KPI observations
- Revenue trends
- Operational recommendations
- Dataset quality observations

---

## 4. AI Chat Assistant

The integrated AI assistant allows users to ask dataset questions such as:
- Which category generated highest revenue?
- Which state performed best?
- What are the major KPIs?
- Which columns contain missing values?
- What recommendations should management take?

The system uses:
- Groq LLM integration
- AI assisted business recommendations
- Context aware dataset responses

---

## 5. Interactive Dashboard

The dashboard automatically generates:
- KPI cards
- Revenue analytics
- Distribution charts
- Category visualizations
- Business summaries

---

## 6. Global Filtering

Users can dynamically filter dashboards by:
- Categories
- Regions
- Dataset columns
- Business dimensions

Charts update in real time.

---

# Technology Stack

## Backend
- Python
- FastAPI
- Pandas
- SQLite
- Groq API

## Frontend
- React
- Vite
- Recharts
- Axios

## Testing
- Pytest
- Vitest
- React Testing Library

---

# System Architecture

## Backend Responsibilities

The backend handles:
- CSV ingestion
- Dataset profiling
- AI response generation
- Executive summaries
- SQLite persistence
- Dashboard API generation
- Filtering logic

---

## Frontend Responsibilities

The frontend handles:
- Dashboard rendering
- Chart visualization
- User interaction
- AI assistant interface
- Dataset upload system
- Interactive filtering

---

# API Endpoints

## Dataset Upload

## Dataset Upload

```http
POST /datasets/upload
```

Uploads and profiles CSV datasets.

---

## Dataset Profiling

```http
GET /datasets/{dataset_id}/profile
```

Returns dataset profiling statistics.

---

## Auto Dashboard

```http
GET /datasets/{dataset_id}/auto-dashboard
```

Generates dashboard visualizations automatically.

---

## Executive Summary

```http
GET /datasets/{dataset_id}/executive-summary
```

Returns AI generated business summaries.

---

## AI Chat Assistant

```http
POST /datasets/{dataset_id}/ask
```

Answers dataset questions using AI powered analytics.

---

# Testing


Backend Testing

Implemented using:

Pytest

Coverage includes:

Health endpoint
CSV upload
Dataset listing
Profiling APIs
Executive summary APIs
AI endpoints

Result:

10 backend tests passing successfully

Frontend Testing

Implemented using:

Vitest
React Testing Library

Coverage includes:

Main title rendering
Upload button rendering
Dashboard controls
Olist analytics rendering
Download report rendering

Result:

5 frontend tests passing successfully

Project Achievements

Successfully implemented:

Generic CSV analytics platform
AI powered analytics assistant
Dynamic dashboard generation
Interactive filtering
Executive summaries
SQLite persistence
Automated profiling
Frontend and backend testing
MCP integration support

Limitations

The following advanced features were partially implemented due to project timeline constraints:

Geographic map visualization
Advanced forecasting models
Dedicated NLP sentiment analysis

However, the system architecture supports future extension for these capabilities.

Future Improvements

Future enhancements may include:

Real time analytics
Advanced forecasting
Sentiment analysis
Interactive map visualizations
Authentication system
Cloud deployment
Multi dataset comparison

Setup Instructions
Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs on:

http://localhost:8000

Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

Environment Configuration

Create a .env file inside backend:

LLM_PROVIDER=groq
GROQ_API_KEY=your_api_key_here

CONCLUSION

DataLens successfully demonstrates how AI powered analytics systems can automate business intelligence workflows for generic datasets. The platform reduces manual dashboard engineering effort by automatically generating profiling insights, KPI analytics, dashboards, and AI assisted business recommendations.

The project combines data engineering, backend systems, frontend analytics, testing, and AI integration into a unified analytics platform suitable for modern business intelligence workflows.