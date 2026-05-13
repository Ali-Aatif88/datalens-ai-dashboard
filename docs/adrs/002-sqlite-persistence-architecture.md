# ADR-002: SQLite Persistence Architecture for Generic CSV Analytics

---

## Status

Accepted

## Date

2026-05-12

---

## Context

DataLens was designed as a generic CSV analytics platform capable of handling uploaded datasets dynamically without requiring predefined schemas.

The project required:
- Lightweight persistence
- Local development simplicity
- Fast setup during grading
- Compatibility with Python and FastAPI
- Ability to store uploaded dataset metadata
- Support for rapid prototyping

The application also needed to persist:
- Uploaded dataset information
- Profiling metadata
- Dataset identifiers
- Dashboard related analytics information

The persistence layer needed to remain simple enough for local academic deployment while still supporting dynamic dataset workflows.

---

## Options Considered

### Option 1: SQLite

SQLite was evaluated as a lightweight embedded relational database.

**Pros:**
- Extremely easy setup
- No server configuration required
- Lightweight and portable
- Fully compatible with SQLAlchemy and FastAPI
- Ideal for local academic projects

**Cons:**
- Limited scalability for enterprise workloads
- Not optimized for high concurrency

---

### Option 2: PostgreSQL

PostgreSQL was considered as a more advanced relational database.

**Pros:**
- Strong scalability
- Advanced query capabilities
- Better concurrency handling

**Cons:**
- Additional setup complexity
- Requires separate database server
- Increased deployment overhead for a student project

---

### Option 3: Pure File Based Storage

Datasets and metadata could have been stored directly in files without a database layer.

**Pros:**
- Very simple architecture
- No database dependency

**Cons:**
- Difficult metadata management
- Poor scalability
- Weak querying capabilities
- Harder dataset tracking

---

## Decision

**We chose SQLite.**

SQLite provided the best balance between simplicity, portability, and functionality for the project requirements.

The embedded database architecture reduced setup overhead while still enabling persistence of dataset metadata and profiling information.

This approach aligned well with the local academic deployment environment and supported rapid backend development using FastAPI and SQLAlchemy compatible workflows.

---

## Trade-offs

- We sacrificed enterprise scalability and distributed database features.
- We accepted limited concurrency handling.
- We optimized for simplicity and reliability rather than production scale deployment.

If the project evolves into a production analytics platform, migration to PostgreSQL would likely become necessary.

---

## Consequences

- The application can run entirely locally without external database infrastructure.
- Dataset metadata persists across application restarts.
- Backend deployment complexity remains low.

---

## References

- backend/datalens.db
- backend/app/main.py
- https://www.sqlite.org/docs.html