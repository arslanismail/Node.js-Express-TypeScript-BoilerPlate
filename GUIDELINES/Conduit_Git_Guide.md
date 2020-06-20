<!--
Recomended Git Style Guide
Authur: Arslan Ismail [AI] (arslanismail840@gmail.com)

-->

# Release Guideline

## Table of Contents

- [Git Branching](#git-branching)
- [Commit Message](#commit-message)

## Git Branching

### Git-Flow

#### ► New Feature

Creating a feature branch `feature/<feature-name>`

Based on: `develop`

Merge into: `develop`

#### ► New Hotfix

Creating a hotfix branch `hotfix/<hotfix-code-or-name>`

Based on: `master`

Merge into: `master` and `develop`

#### ► New Release

Creating a feature branch `release/<release-version>`

Version: [Symentic version](https://semver.org/)

Based on: `develop`

Merge into: `master` and `develop`

- `After Merge:` Tag: create a new tag for the version and delete the release branch

UI: You can use SourceTree/Fork for this. Sourcetree has built-in support for Git-Flow and you just have to use the Interface (Buttons) to do the operations.
Command-Line: If you prefer you can learn about the Git-Flow command line at: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

## Commit Message

I request you all to follow this guideline when you write a Commit Message to show a meaningful message.

```text
Added: for new features.
Changed: for changes in existing functionality.
Deprecated: for soon-to-be removed features.
Removed: for now removed features.
Fixed: for any bug fixes.
Security: in case of vulnerabilities.
Partial: If a feature is not complete.
Fixes #33 Issue summary/title
```

### Git specific Change Log

Close an issue in the Repository using commit message.

Supported keywords:

- close
- closes
- closed
- fix
- fixes
- fixed
- resolve
- resolves
- resolved

#### Fix Single Issue with Commit message

```text
Fixes #45 will close issue 45 in that repository once the commit is merged into the default branch.
```

#### Fix multiple Issues with commit message

```text
Fixes #45, closes #51, closes example_user/some_other_repo#42
#this will close multiple issues at once considering you have push access to all the repos.
```

### Benefits of following this format

- Meaningful message for each commit
- Quick Code Reviews
- Easy to write Release Notes using the Commit messages.
- Rebase/Cherry-pick will be quicker
