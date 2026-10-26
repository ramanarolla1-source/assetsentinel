# AssetSentinel Roadmap

This roadmap separates evidence quality from software implementation. Items are proposed milestones, not claims that functionality already exists.

## Milestone 1 — Establish the working prototype
- [ ] Commit the existing Netlify MVP source files to this repository.
- [ ] Confirm the GitHub source and deployed Netlify site are the same version.
- [ ] Test registry search, Legal Receipt view, source link, and browser-side document hashing.
- [ ] Keep all unverified seed records explicitly labelled.

## Milestone 2 — Validate the real-world example
- [ ] Retrieve the official docket and underlying order from an authoritative court source where available.
- [ ] Inspect later docket entries to determine whether the order was modified, vacated, stayed, or otherwise affected.
- [ ] Confirm the exact asset/address scope from the primary documents.
- [ ] Record source URL, retrieval time, document hash, reviewer, and validation rationale.
- [ ] Do not describe the record as verified until these checks are complete.

## Milestone 3 — Legal Receipt and evidence workflow
- [ ] Represent case existence, source authenticity, asset linkage, and legal effect as separate verification dimensions.
- [ ] Preserve version history; do not silently overwrite earlier reports.
- [ ] Add reviewer queue for community reports and AI-discovered leads.
- [ ] Keep allegations, pending proceedings, judicial findings, and orders distinct.
- [ ] Show source provenance and uncertainty to users.

## Milestone 4 — Discovery adapters
- [ ] Define a source-adapter interface independent of any single oracle.
- [ ] Start with a bounded jurisdiction and measurable source list.
- [ ] Record coverage, freshness, latency, failures, and terms of access for each source.
- [ ] Treat social posts, news, and AI matches as leads, not proof.
- [ ] Benchmark recall and precision against a curated set of known proceedings.

## Milestone 5 — Production readiness (later)
- [ ] Add database, authentication, role-based access, and audit logs.
- [ ] Add update scheduling, monitoring, and safe retry behaviour.
- [ ] Add privacy, abuse reporting, correction/appeal, and data retention policies.
- [ ] Conduct security, accessibility, and legal review.
- [ ] Consider chain integrations only when the evidence and governance model is mature.

## Out of scope for current static MVP
Automated live court-data retrieval, comprehensive global coverage, legal adjudication, automatic asset freezing, transaction blocking, and guaranteed legal clearance.
