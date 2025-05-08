# Test Driven Development Workflow

If you are asked to follow TDD when writing any code you need to follow the following steps in order:

1. Write a Failing Test

   - Create a test that will fail initially
   - Avoid mocking the component under test
   - Focus on testing behavior, not implementation

2. Verify Test Failure

   - Execute the test and confirm it fails
   - Do not implement any fixes at this stage
   - Document expected vs actual behavior

3. Commit Failing Test (**REQUIRED STEP - DO NOT SKIP**)

   - Stage changes: `git add <file-path>`
   - Create a clear commit message that describes the test purpose: `git commit -m "test(<component>): add failing test for <behavior>"`
   - **This step must be completed before proceeding to implementation**
   - **IMPORTANT: Never proceed to implementation until this step is complete**
   - **This is a critical part of the TDD workflow that ensures proper test-first development**

4. Implement Solution
   - Write minimal code to make test pass
   - Keep test code unchanged
   - Run tests frequently
   - Refactor while maintaining test coverage
   - Iterate until all tests pass
   - Stage changes: `git add <file-path>`
   - Commit the passing implementation: `git commit -m "feat(<component>): implement <behavior>"`

## Complete TDD Cycle Example

```
# 1. Write failing test
# 2. Verify test failure
npm run test:once "Path/To/TestFile.test.ts"
# 3. Commit failing test
git add Path/To/TestFile.test.ts
git commit -m "test(Component): add failing test for feature X"
# 4. Implement solution
# 5. Verify test passes
npm run test:once "Path/To/TestFile.test.ts"
# 6. Commit passing implementation
git add Path/To/Component.ts
git commit -m "feat(Component): implement feature X"
```

## Mocks

- Avoid local mocks
- Do not mock the class you are checking
- Avoid mocking entities
- Do not mock the app object repo
- If a specific test is expected to warn or error, override the warn and error functions so they do not log to the console
- If the script you are testing references other UCs, get the mock for those UCs from the Mock folder
- If the script you are testing references other UCs that come from the @vived/host package, check the @vived/host package for a Mock
- Limit the number of expect statements in each class
- Use the beforeEach call to setup common components. Example the appObject repo.
- Do not mock @vived/host

## Commands

- Use the following command to run test: `cd LOCAL_PATH ; npm run test:once "Path to test"`
- Example: `cd c:\Users\amosp\Documents\WebGL\vivedlearning_host ; npm run test:once "StateMachine/Entities/HostStateEntity.test.ts"`

## Exceptions

The following file should not be follow this process unless explicitly asked

- Main.ts
- Mocks
- Factories
