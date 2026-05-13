# Implementation Plan: DataLens Olist Dashboard

## Goal

Build a generic CSV analytics dashboard with CSV upload, profiling, visualizations, filters, LLM chat, executive summary, SQLite persistence, and Olist-specific demo readiness.

## Build Order

1. Project setup and dependency installation
2. Backend health endpoint
3. Frontend shell
4. CSV upload and validation
5. SQLite persistence
6. Automatic data profiling
7. Dashboard chart generation
8. Global filters
9. Olist merged CSV preparation
10. LLM chat using Gemini tool-calling
11. Executive summary
12. Geographic visualization
13. Time-series forecasting
14. Text/NLP review analysis
15. MCP extra credit integration
16. Backend and frontend tests
17. README, ADRs, and final report

## Core Principle

Build in thin vertical slices. Each feature must be tested and committed before moving to the next feature.

## Risk Control

Do not implement stretch goals until the core application works. MCP, forecasting, geographic visualization, and NLP are extra credit and must not break the MVP.

## Dataset Strategy

Use the Brazilian E-commerce Olist dataset. Create one flattened CSV called `olist_master.csv` by merging orders, order_items, payments, reviews, customers, products, sellers, and product category translation where useful.

## LLM Strategy

Use Gemini API for the app’s LLM chat and executive summary. Backend will expose controlled tools such as profile_data, query_data, get_statistics, and generate_chart_data.

## Testing Strategy

Backend must include at least 10 pytest tests. Frontend must include at least 5 Vitest tests. Tests should cover upload, profiling, filters, dashboard rendering, chat interface, and persistence.

## Documentation Strategy

Write at least 3 ADRs:
1. LLM provider choice
2. SQLite schema and CSV persistence strategy
3. Chart and dashboard architecture

README must include setup, API key instructions, run command, tests, troubleshooting, and team contribution summary.