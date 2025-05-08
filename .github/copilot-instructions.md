# GitHub Copilot Instructions

This typescript project is used to create the NPM Core package named @vived/core.

## File Naming Conventions

- For function files: Use **camelCase** (e.g., `sourceFileForAFunction.ts`)
- For class files: Use **PascalCase** (e.g., `SourceFileForAClass.ts`)
- Test files: Match source filename + `.test.ts` (e.g., `sourceFileForAFunction.test.ts`)


## Code Standards

- Use **PascalCase** for classes and interfaces (prefix interfaces with "I")
- Use **camelCase** for variables, functions, and parameters
- Prefix boolean variables with "is" or similar
- Use tabs for indentation, not spaces
- Place curly braces on a separate line
- Include a single blank line between methods
- Minimize comments. The code should speak for itself


## Terminal Commands

- Format code: `npm run format`
- Lint code: `npm run lint`
- Run test: `npm run test:integration`
- Run integration tests: `npm run test:integration:once`

### Terminal Command Syntax

When executing terminal commands in PowerShell:

- Use forward slashes (`/`) for paths instead of backslashes to avoid escape character issues
- Use semicolons (`;`) instead of ampersands (`&&`) to chain commands
- For PowerShell compatibility, structure multi-step commands as:
  ```powershell
  cd PATH TO DIRECTORY ; npm run test:once "StateMachine/UCs/NextSlideUC.test.ts"
  ```
- When running git commands that require double quotes, ensure proper escaping:
  ```powershell
  git commit -m "feat(Component): implement feature"
  ```