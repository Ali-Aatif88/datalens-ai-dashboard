# ADR-001: Selection of Groq for AI Powered Dataset Analytics

---

## Status

Accepted

## Date

2026-05-12

---

## Context

DataLens required an AI powered analytics assistant capable of answering dataset related business questions, generating recommendations, and supporting executive summaries.

Initially, Google Gemini was considered because of its free tier and simple API integration. However, during implementation the project encountered quota exhaustion and API limitation issues on the free tier, which prevented reliable testing and grading stability.

The project required:
- Fast response times
- Reliable API access
- Low integration complexity
- Free tier compatibility
- Stable responses during demonstrations

The AI assistant also needed to support:
- Dataset grounded recommendations
- KPI analysis
- Missing value explanations
- Business insight generation

---

## Options Considered

### Option 1: Google Gemini

Google Gemini was initially integrated for AI analytics.

**Pros:**
- Easy API onboarding
- Good documentation
- Free tier availability

**Cons:**
- Frequent quota exhaustion
- API request limitations
- Unstable free tier reliability during testing

---

### Option 2: Groq

Groq API was later integrated for AI powered dataset analytics.

**Pros:**
- Extremely fast inference speed
- Stable API availability
- Free tier suitable for academic projects
- Easy integration with Python backend

**Cons:**
- Smaller ecosystem compared to OpenAI
- Fewer advanced tooling capabilities

---

### Option 3: Local Rule Based Analytics Only

A fully local analytics assistant without external LLM integration.

**Pros:**
- No API dependency
- Fully offline operation

**Cons:**
- Limited intelligence
- Poor conversational flexibility
- Less realistic AI interaction

---

## Decision

**We chose Groq.**

Groq provided the best balance between speed, reliability, and ease of integration within the project timeline constraints.

The API responded consistently during testing and supported management style business recommendations effectively. The integration also reduced the risk of demonstration failure caused by quota exhaustion issues encountered with Gemini.

The solution aligned well with the project goal of creating an AI assisted analytics dashboard while remaining feasible within an academic development environment.

---

## Trade-offs

- We sacrificed Gemini specific tooling support.
- We accepted dependence on an external API provider.
- We prioritized stability and grading reliability over advanced enterprise features.

If future deployment requirements expand, OpenAI or enterprise grade providers may be reconsidered.

---

## Consequences

- The backend environment now requires a Groq API key.
- AI endpoints are dependent on external internet connectivity.
- The system can provide significantly more natural business recommendations compared to rule based analytics alone.

---

## References

- backend/app/main.py
- backend/.env.example
- https://console.groq.com/docs