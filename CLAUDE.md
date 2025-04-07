# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Test Commands
- Build: `npm run build`
- Lint: `npm run lint`
- Run all tests: `npm run testOnce`
- Run tests in watch mode: `npm run test`
- Run single test file: `jest --config jestconfig.json path/to/test.ts`

## Code Style Guidelines
- TypeScript with strict mode
- Use arrow functions for class methods
- No console.log in production code
- Export all public entities from index.ts files
- Use PascalCase for class names and camelCase for variables/methods
- Types are explicitly defined, avoid `any`
- TS target: ES2020, module: ESNext
- Methods should have descriptive names
- Use Jest for unit tests, mocks with jest.fn()
- Error handling: use try/catch blocks when appropriate
- Prefer explicit returns over implied returns
- Follow repository organization (AppObject, Entities, Types, etc.)
- Follow the observable pattern where appropriate
- Use explicit typing for function parameters and return values