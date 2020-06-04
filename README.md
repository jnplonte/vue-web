# LOGFLOWS REPORTING TOOLS

## Version
**v3.0.0**

## Dependencies
* nodejs: [https://nodejs.org/](https://nodejs.org/en/)
* vuejs: [https://vuejs.org/](https://vuejs.org/)
* vuecli: [https://cli.vuejs.org/guide/installation.html]

## Getting started

```bash
# Clone the project
git clone git@bitbucket.org:logflows/report-v2.git

# Enter the project directory
cd report-v2

# Install dependency
npm install

# Develop on localhost:8000
npm start
```

## Build

```bash
# Build for development environment
npm run build:dev

# Build for production environment
npm run build:prod
```

## Test

```bash
# Run unit tests (jest)
npm run test:unit

# Run end-to-end tests (cypress)
npm run test:e2e
```

## Advanced

```bash
# Preview the release environment effect on port 9999
npm run preview

# Preview the release environment effect + static resource analysis
npm run preview -- --report

# Code format check
npm run lint

# Code format check and auto fix
npm run lint -- --fix
```