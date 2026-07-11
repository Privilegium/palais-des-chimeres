Antigravity is the main implementation agent.
It builds features, UI, pages, and interactive behavior.

Codex is the review/refactor/QA agent.
It checks architecture, TypeScript, forms, requirements, bugs, and build quality.

Do not let both agents edit the same files at the same time.
Workflow:
1. Antigravity implements a feature.
2. User reviews preview.
3. Commit or save changes.
4. Codex reviews/refactors/fixes.
5. Continue with next feature.