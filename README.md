# AssetSentinel

**LEGAL INTELLIGENCE FOR ON-CHAIN ASSETS**

Evidence-first pre-transaction legal-risk lookup for identifiable crypto assets. AssetSentinel helps users discover source-linked legal-dispute information, inspect verification states, and review traceable Legal Receipts before transacting.

> **Important:** AssetSentinel is an evidence and information layer, not a court or adjudicator. It does not determine liability, automatically freeze assets, or block transactions. A missing record is not proof that an asset is legally clear.

## MVP status

This repository contains the static, dependency-light MVP: searchable registry, Legal Receipt view, explicit verification states, source link, and browser-side SHA-256 calculation for a user-selected document. GitHub should become the canonical source for future changes after it has been compared with the deployed Netlify version.

The current Netlify demo contains a seed record based on a secondary docket mirror. Its source validation, current docket status, exact asset scope, and legal effect require independent confirmation before the status may be upgraded.

## Evidence and verification model

AssetSentinel keeps these questions distinct:

1. **Discovery:** where a possible lead was found.
2. **Source/case verification:** whether the source and proceeding can be authenticated.
3. **Asset linkage:** whether the identified proceeding actually concerns the asset.
4. **Legal-effect assessment:** what a verified claim or order says and what it does not establish.
5. **Publication and update:** current status, provenance, and history of changes.

A party report or AI-generated match is a lead, not proof. Hashing a file supports comparison with a known reference; it does not prove that a document came from a court or that its contents are legally effective.

## Planned repository layout

- `index.html` — application entry point
- `src/styles.css` — visual styling
- `src/app.js` — client-side registry and interactions
- `data/cases.json` — demo case record(s)
- `SOURCE_NOTES.md` — source and verification caveats
- `ROADMAP.md` — proposed implementation sequence

## Run locally

For the static prototype (once the app files are committed), Python 3 is sufficient:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser. No build step or package installation is required.

## Current limitations

This is not yet a live court-data service. Automated docket discovery, continuous refresh, authenticated accounts, a database, reviewer/admin queue, party notifications, payment, and chain-level integrations are not implemented. Coverage is not comprehensive.

## Legal notice

The prototype is for demonstration and research. It is not legal advice, does not adjudicate disputes, and does not impose transaction restrictions. Information may be incomplete or outdated; consult authoritative sources and qualified counsel.

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE).
