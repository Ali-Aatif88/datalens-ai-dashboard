# Final Project Report

---

# Team

- **Member 1:** Muhammad Ali Aatif
- **Member 2:** Shamoon Jan Aurakzai
- **Member 3:** Minhaaj Saqib
- **Assigned Dataset:** Brazilian E-Commerce Public Dataset by Olist
- **Coding Agent Used:** Antigravity
- **LLM Used in the App:** Groq

---

# 1. What the Agent Did Well

One of the strongest contributions from the coding agent was helping structure the backend analytics architecture for generic CSV datasets. When we asked the agent to create dataset profiling logic, it automatically identified the need for numeric column detection, categorical analysis, missing value statistics, and KPI generation. It generated reusable profiling structures that worked for both generic CSV uploads and the Olist dataset without requiring major rewrites.

Another strong contribution involved frontend dashboard generation. The agent helped generate React dashboard components capable of rendering dynamic charts and KPI cards from backend responses. Instead of hardcoding Olist specific visualizations only, the generated architecture supported generic datasets as well, which aligned with the project requirements.

The agent also significantly accelerated AI assistant integration. During implementation of the dataset chat assistant, the agent generated backend prompt structures and context injection logic that allowed the LLM to answer business questions using dataset summaries and profiling information. This reduced manual experimentation and integration time substantially.

The testing phase also benefited heavily from the coding agent. The agent generated working pytest backend tests and Vitest frontend tests that covered upload endpoints, profiling APIs, dashboard rendering, and frontend components. These tests improved project reliability and helped us validate the application before final submission.

Finally, the agent assisted strongly during documentation and ADR writing. It helped structure architecture decisions clearly and transformed rough implementation notes into professional technical documentation suitable for grading.

---

# 2. Where We Had to Intervene

One major intervention occurred during the LLM integration phase. Initially, the implementation relied on Google Gemini because it was originally planned in the specification. However, the free tier quota repeatedly failed during testing and produced unstable API responses. We recognized that continuing with Gemini could risk the final demonstration. We redirected the implementation toward Groq integration, which proved significantly more stable for the academic project environment.

Another important intervention involved protecting the “generic dataset” requirement. Several implementation suggestions naturally drifted toward Olist specific logic because the Olist dataset was the main demonstration dataset. We repeatedly redirected the architecture toward reusable generic CSV handling so the system could analyze arbitrary uploaded datasets instead of becoming a fixed e-commerce dashboard.

We also intervened during the late implementation phase when advanced features such as forecasting, NLP sentiment analysis, and geographic maps risked destabilizing the application close to submission. Instead of forcing partially completed features, we prioritized testing stability, backend reliability, and documentation quality. This decision significantly improved the final submission quality.

Another important lesson involved frontend testing. Early test implementations failed because multiple React components rendered duplicate buttons during repeated test runs. We recognized that cleanup logic was missing between tests and corrected the testing architecture accordingly. This improved our understanding of frontend component lifecycle behavior in automated testing environments.

---

# 3. Which Skills Activated When

## spec-driven-development

The specification strongly guided implementation decisions throughout the project. The requirement for “generic CSV analytics” repeatedly influenced architectural choices and prevented the application from becoming tightly coupled to the Olist dataset alone.

---

## planning-and-task-breakdown

The project was divided into clear milestones including upload systems, profiling, dashboard generation, filtering, AI integration, testing, and documentation. This prevented implementation chaos and allowed the team to progress systematically.

---

## incremental-implementation

The system was implemented feature-by-feature rather than attempting the full application at once. For example, the upload system was stabilized before dashboard generation, and dashboard generation was completed before AI integration. This reduced debugging complexity significantly.

---

## test-driven-development

Backend and frontend testing became critical during the final project phase. Pytest tests validated backend APIs while Vitest validated frontend rendering behavior. The testing workflow helped identify integration issues before final submission.

---

## documentation-and-adrs

Architecture Decision Records became useful for documenting why certain technologies and architectures were selected. The ADR process forced us to think more carefully about persistence architecture, filtering systems, and AI provider selection rather than making purely ad hoc implementation decisions.

---

## git-workflow-and-versioning

GitHub version control helped preserve stable working versions during implementation. Frequent commits reduced the risk of catastrophic project loss during rapid development and debugging sessions.

---

# 4. What We Would Do Differently

If given additional development time, we would fully implement:
- Geographic map visualizations
- Forecasting dashboards
- Dedicated NLP sentiment analysis
- Improved authentication and user management
- Cloud deployment support

We would also refactor parts of the frontend into smaller reusable React components to improve maintainability.

Another improvement would involve adding caching and asynchronous processing for large datasets to improve performance on datasets larger than 100K rows.

We would also spend more time improving prompt engineering and conversation memory for the AI assistant to support more advanced analytical questioning.

---

# 5. Key Lessons for Future Projects

One major lesson was that specification discipline becomes increasingly important as projects grow larger. Whenever implementation drifted away from the original “generic analytics” requirement, technical debt increased rapidly.

Another major lesson was that AI coding agents are most effective when paired with strong human oversight. The agent accelerated implementation substantially, but architectural judgment still required human decision making.

We also learned that testing should not be postponed until the very end. Backend and frontend tests significantly improved confidence before final submission and reduced debugging stress.

Another important takeaway was that stable and reliable implementations are more valuable than attempting every possible advanced feature. Prioritizing robustness over feature quantity improved the final project quality substantially.

Finally, we learned that ADRs and documentation are not merely grading requirements; they actually improved team coordination and architectural clarity during implementation.

---

# 6. Time Spent (approximate)

| Activity | Hours |
|----------|-------|
| Reading docs and setup | 6 |
| Specification and planning | 5 |
| Backend implementation | 14 |
| Frontend implementation | 12 |
| AI integration | 5 |
| Debugging and testing | 8 |
| Documentation and ADRs | 5 |
| Final polishing and submission | 3 |
| **Total per person** | **58 hours** |

---

# 7. Acknowledgments

We used the Agent Skills framework developed by Addy Osmani:
https://github.com/addyosmani/agent-skills

We also acknowledge:
- FastAPI documentation
- React and Vite documentation
- Groq API documentation
- Recharts documentation
- Pandas documentation
- Class discussions and peer feedback during implementation

---

*Report version: 1.0 | Last updated: 2026-05-13*