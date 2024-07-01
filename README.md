# POC MFE Monorepo

This repository is a Proof of Concept (POC) for a Micro Frontend (MFE) architecture within a monorepo setup. It demonstrates how to manage multiple micro frontend applications in a single repository using modern tools and techniques.

## Table of Contents
- [Installation](#installation)
- [Description](#description)
- [Features](#features)
- [Requirements](#requirements)
- [Structure](#structure)
- [Getting Started](#getting-started)
  - [Code Editor](#code-editor)
  - [Naming](#naming)
  - [Code Rules & Standard](#code-rules--standard)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/andra456/poc-mfe-monorepo.git
   ```

## Description

The project develop using micro container frontend architecture & monorepo we provide standardization code & git (feature branch)

## Features

- SSR & Code spliting
- Context & Jotai Management System
- Design System
- Typescript & Javascript

## Requirements

- Node >= 12 (LTS)
- Yarn >= 1.22.10 (optional)
- Nx Workplace

## Structure

```

├── apps
│   ├── container
│   │   └── src
│   │       └── app
│   │           ├── router      # main routing container
│   │           └── main.tsx    # main app
│   ├── container-next
│   │   └── app
│   │       └── [slug]
│   │           └── page.tsx    # main routing & app container
│   │
│   └── feature
│       └── src
│           ├── __test_
│           │   ├── preview.spec    # unit test
│           │   └── ...
│           └── app
│               ├── standard    # page standard
│               │   ├── preview
│               │   ├── editor
│               │   ├── ...
│               ├── costumize    # page preview
│               │   ├── huawei   # unique by id client by subModule
│               │       ├── preview
│               │       ├── editor
│               │       ├── ...
│               │   ├── astra
│               │   ├── ...
│               └── ...
├── libs
│   ├── component-feature   # purpose will be a package
│   │   └── src
│   │       ├── __test_
│   │       │   ├── TablePane.spec    # unit test
│   │       │   └── ...
│   │       └── lib
│   │           ├── TablePane   # component page pane
│   │           ├── ...
│   └── ui-design-system    # purpose will be a package
│       ├── src
│           ├── index.ts
│           └── lib
│               ├── button
│               ├── table
│               ├── datePicker
│               └── ...
├── tools
│   └── debaunce        # utils resuseable component
└── ...
```

## Getting started


### Code Editor

Please install this on visual code or other code editor

- Prettier - Code formatter
- SonarLint
- ESLint

### Naming

- Create component’s names should be PascalCase. e.g HomePage.js
- Create other helper/utils files should be camelCase. e.g useContext.js
- All the folder names should be camelCase. e.g components, routes, context
- CSS in JS/TS files should be named the same as the component PascalCase and add an underscore in the front of the name, e.g \_HeaderStyle.ts
- Test files should be named the same as the component or non-component file and in folder **tests**. e.g fetcher.test.ts the regex is **/**tests**/**/\*.spec.ts

### Code Rules & Standard

- Code use the clean code principle
- Create multiple files if willing to write a big file. e.g homeTable, homeView, homeFilter
- Spare code and style if using inline css / styled component/emotion
- Please follow linter ( ESLint, SonarLint) rules. This in turn helps us write clean, consistent code.
- Please review your own code / make sure all accordance with the rules before merge request / pull request.
- Dont duplicate code from multiple functions or files or if the function used in many services create in package or utils
- Destructuring props e.g function({id, data}), is a better way to help make code cleaner and more maintainable.
- Using naming interface, type, and enum start with PascalCode for example PropsHome
- If a string variable is used in multiple files and code, create constants for readable and reusable
- Make sure clean & efficient for import module / files
- make sure page / feature do not brute render ( should be understood flow work of the framework )# SFReport micro container
