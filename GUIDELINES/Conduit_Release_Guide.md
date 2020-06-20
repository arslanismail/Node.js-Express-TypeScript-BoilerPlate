<!--
Recomended Database Style Guide
Authur: Arslan Ismail [FN] (arslanismail840@gmail.com)

-->

# Release Guideline

## Table of Contents

- [Change log Document](#change-log-document)
- [Release Notes](#release-notes)

Send a RELEASE_NOTES.md document with each release.
Follow the Git-Flow when creating the Release, feature, hotfix, details below.

## Change log Document

Maintain a CHANGE_LOG.md document inside your repository and update it with each new release.

`Note: Best time to add this during Pull Request review.`

Learn how to write good Change Log: [Article Link](https://keepachangelog.com/en/1.0.0/#how)

### Format for Change Log

```text
Added: for new features.
Changed: for changes in existing functionality.
Deprecated: for soon-to-be removed features.
Removed: for now removed features.
Fixed: for any bug fixes.
Security: in case of vulnerabilities.
```

## Release Notes

Add a new release section for each release on top of the RELEASE_NOTES.md file inside your repository.

### Format for writing Release Notes

```text
Title: Encryption, OCR Optimization, Arabic Support
Release: v0.1.0-rc
Date: 2020-03-23
Filename: retail_banking-v0.1.0-rc.apk
Milestones:
Onboarding, Dashboard and Payment screens.

What's New:
1. New Admin panel design [Link](#void)
2. API v2 implemented
3. Something else

Improvements:
1. General UX improvements

Bug Features:
1. Fixed: Payment Transfer screen crashing
2. Fixed: Signup API dummy data
```
