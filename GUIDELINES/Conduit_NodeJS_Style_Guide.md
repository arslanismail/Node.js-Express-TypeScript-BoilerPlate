<!--
Recomended Node.js Code Style Guide Lines
Authur: Arslan Ismail [AI] (arslanismail840@gmail.com)
-->

# NodeJS Style Guide

This style guide helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

- To reduce the effort needed to read and understand source code.
- To enable code reviews to focus on more important issues than arguing over syntax and naming standards.
- To enable code quality review tools to focus their reporting mainly on significant issues other than syntax and style preferences.

## Table of Contents

- [Typescript Configuration](#typescript-configuration)
- [File and Folder Strucutre](#file-and-folder-structure)
- [Code Syntax Guide](#code-syntax-guide)

## Typescript Configuration

### Type Global Definition

1. For interfaces create a file with "\*.d.ts" extension to add typings.
2. For external packages: If a package doesn't have typing support create a module file and declare that module.
3. Add @types/\*\* packages for each bundle used in typescript files.
4. Shared types should be defined in 'types.ts'.
5. If type and class are in the same file, type definitions should come first.

## File and Folder Structure

| Name                              | Description                                                                 |
| --------------------------------- | --------------------------------------------------------------------------- |
| **.vscode/**                      | VSCode tasks, launch.json, settings.json and extensions.json for the repo   |
| **dist/**                         | Compiled source files will be placed here                                   |
| **src/**                          | Source files                                                                |
| **src/api/controllers/**          | REST API Controllers                                                        |
| **src/api/controllers/requests**  | Request classes with validation rules if the body is not equal with a model |
| **src/api/controllers/responses** | Response classes or interfaces to type json response bodies                 |
| **src/api/errors/**               | Custom HttpErrors like 404 NotFound                                         |
| **src/api/interceptors/**         | Interceptors are used to change or replace the data returned to the client. |
| **src/api/models/**               | Database Models                                                             |
| **src/api/repositories/**         | Repository / DB layer (Optional)                                            |
| **src/api/services/**             | Service layer                                                               |
| **src/api/validators/**           | Custom validators, which can be used in the request classes                 |
| **src/auth/**                     | Authentication checkers and services                                        |
| **src/config/middlewares/**       | Express Middlewares like helmet security features                           |
| **src/util/**                     | The core features like logger and env variables                             |
| **src/db/factories**              | Factory the generate fake entities                                          |
| **src/db/migrations**             | Database migration scripts                                                  |
| **src/db/seeds**                  | Seeds to create some data in the database                                   |
| **src/typings/** \*.d.ts          | Custom type definitions and files that aren't on DefinitelyTyped            |
| **\_\_tests\_\_**                 | Tests                                                                       |

### Components

1. Single file per logical component (e.g. route, parser, validator, middleware).
2. Create a file index.ts file in each folder to export other components in that folder through it.

### Types

1. Do not export types/functions unless you need to share it across multiple components.
2. Do not introduce new types/values to the global namespace.

**[⬆ back to top](#table-of-contents)**

## Code Syntax Guide

### Names

1. Use PascalCase for type names. `
2. Use "I" as a prefix for interface names.
3. Use PascalCase for enum values.
4. Use camelCase for function names.
5. Use camelCase for property names and local variables.
6. Do not use "\_" as a prefix for private properties.
7. Use whole words in names when possible.
8. Use "\_" as a prefix in local variables names to ignore the unused variable warnings.

### null and undefined

1. Use undefined. Do not use null.

### Comments

1. Use JSDoc style comments for functions, interfaces, enums, and classes.

### Strings

1. Use single quotes for strings.
2. User string interpolation \`Hello \${username},\` instead of concatenation with `+`

### General Assumptions

1. Consider Nodes, Symbols, etc. as immutable data type outside the component class. (Should have a set function to Modify propery).
1. Consider arrays as immutable by default after creation.

**[⬆ back to top](#table-of-contents)**
