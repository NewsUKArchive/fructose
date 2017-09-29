

## Running the example end to end tests  🏃

In order to run the examples, it is assumed that you have the latest version of (xCode | android studio | chrome browser) installed for (iOS | Android | Web).

- `yarn` in project root to install project dependencies.
- Follow steps 1-4 of [Detox] getting started for native.
- `yarn` in the e2e directory.
- `react-native (run-ios | run-android)` in the e2e directory.

You should now be in a position to run 
one of the following.

- `yarn test:(ios|android|web)`


## Submitting an Issue  

Before you submit your issue please search the issue archive

If your issue appears to be a bug, providing the following information will increase the chances of your issue being dealt with quickly:

- Overview of the Issue - if an error is being thrown a non-minified stack trace helps
- Motivation for or Use Case - explain why this is a bug for you
- Browsers and Operating System - is this a problem with all browsers or only specific ones?
- Reproduce the Error - provide a live example
- Related Issues - has a similar issue been reported before?
- Suggest a Fix - if you can't fix the bug yourself, perhaps you can point to what might be causing the problem (line of code or commit)


## Submitting a Pull Request 
### Testing

Ensure every new module has sufficient testing in place, ideally aiming for 100% coverage where possible.
You are able to see coverage by running 
`yarn test:unit - --coverage`


Where appropriate (i.e. new features) there should also be a new e2e example created in `*.fructose.@(web|ios|android).js`.

On submitting a PR all unit, integration and e2e tests will run. If a failure occurs your PR will not be approved.

### Commit messages

When committing please follow the set convention below:

```
feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
```

Fructose uses an auto publishing feature that uses the commit convention to work out the bump version.

[detox]:  https://github.com/wix/detox/blob/master/docs/Introduction.GettingStarted.md