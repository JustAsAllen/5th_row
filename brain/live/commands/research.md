---
description: RESEARCH MODE. Deep multi-source research (web, docs, papers, official sources) before any implementation. Return cited synthesis, then implement only if asked.
agent: build
---

Research: $ARGUMENTS

Deep-research workflow: QUESTION → web/firecrawl search → primary + official
sources → docs (context7 for libraries) / papers → cross-check → synthesize →
(if requested) implement. Prefer current official documentation over training
memory — especially for library APIs. Cite URLs for every significant claim.
Return: `ANSWER → SOURCES (urls) → CONFIDENCE → UNKNOWNS`. Research is
read-only unless the user explicitly asks you to then implement.