# Repository Guidelines

## Project Structure & Module Organization

This repository is currently an empty project scaffold. Keep application code in `src/` once implementation begins, with reusable UI in `src/components/`, page-level features in `src/app/` or `src/pages/`, and shared utilities in `src/lib/`. Place static files such as images and fonts in `public/`. Keep tests next to the code they cover (`Button.test.tsx`) or in a top-level `tests/` directory; choose one pattern and use it consistently.

## Build, Test, and Development Commands

No package manager configuration or scripts are committed yet. When adding one, expose a small, conventional command set:

- `npm run dev` — start the local development server.
- `npm run build` — create a production build.
- `npm run lint` — check code quality and formatting rules.
- `npm test` — run the automated test suite.

Document any nonstandard setup or environment variables in `README.md`; do not add credentials to the repository.

## Coding Style & Naming Conventions

Use two-space indentation for JSON, YAML, CSS, and JavaScript/TypeScript. Prefer TypeScript for new application code. Name React components in PascalCase (`ProjectCard.tsx`), functions and variables in camelCase, and route folders in lowercase kebab-case. Keep components focused, move repeated logic to `src/lib/`, and favor semantic HTML and accessible labels.

Run the repository's formatter and linter before committing. Once introduced, formatting configuration is authoritative; avoid manual style-only churn in unrelated files.

## Testing Guidelines

Add tests for behavior changes, edge cases, and regressions. Use descriptive names such as `ProjectCard shows the project title`. Mock network calls at the boundary rather than testing implementation details. Run `npm test` and `npm run build` before opening a pull request.

## Commit & Pull Request Guidelines

There is no existing Git history to establish a convention. Use short imperative commits, optionally with Conventional Commit prefixes: `feat: add project gallery` or `fix: preserve keyboard focus`. Keep each commit scoped to one concern.

Pull requests should explain the user-facing change, list verification performed, link relevant issues, and include screenshots or recordings for visual changes. Call out any setup, migration, or environment-variable changes explicitly.
