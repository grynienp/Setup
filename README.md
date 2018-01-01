# Starter Kits

#### Published on January 1, 2018

My goals in putting this together:

1. Have a starter kit for the projects I'm interested in.
1. Allow people to follow along with various walkthroughs. Instead of watching NodeJS videos, use the starter kit to code along, adding any missing dependencies as you go. The kit also adds a lot of syntax help, which should hopefully allow you to weed out common mistakes early and focus on the actual app and language logic.
1. Give a sense of the standard moving parts expected from modern software.

Inspired by the following sources:

1. The JavaScript Starter Kit Manifesto:
   https://www.youtube.com/watch?v=jubd2opc4Ps

2. Building a JavaScript Development Environment:
   https://app.pluralsight.com/library/courses/javascript-development-environment/table-of-contents

3. PluralSight - Visual Studio Code:
   https://app.pluralsight.com/library/courses/visual-studio-code/table-of-contents

## The Checklist

1. OS prerequisites (Chocolatey, PowerShell, VS Code w/ multiple integrated shells)
1. Project structure and shells used (e.g. Bash, PowerShell, zsh, etc...)
1. Package management - Managers (npm, yarn)
1. Package management - Deprecation strategy (Greenkeeper)
1. Package management - security (Node Security Platform, Snyk, RetireJS)
1. Module management (CommonJS, AMD, ES6)
1. Version control + cloud storage (Git/GitHub, SVN, Mercurial)
1. Linting (ESLint, TSLint)
1. Formatting (Prettier)
1. Transpiling (Babel, tsc)
1. IntelliSense (@types/\* in VSC, tsconfig.json, Flow, )
1. Development Web Server (http-server, lite-server, Express, webpack-dev-server)
1. Documentation (documentation.js, sassdoc)
1. Sharing work (localtunnel)
1. Bundling with sourcemaps, minification, concatenation, spriting (for images), and compression (TBD)
1. Build/Task management (npm with npx, yarn)
1. Dynamic HTML generation (TBD)
1. Centralized HTTP (TBD)
1. Mocking framework (TBD)
1. Testing suite (TBD)
1. Continuous Integration (TBD)

# TODO

Move all personal files to a separate repo.

1. _Browser/_: This is a collection of browser snippets I put together from various online resources. These won't be used in this tutorial series, so feel free to get rid of them now.
1. _docs/_: This directory is automatically made later on, so it can go for now.
1. _Documentation/_: The files containing this tutorial, so you won't be needing that.
1. _node_modules/_ and _yarn-offline-mirror/_: You'll need to eventually run `> npm install` or `> yarn install`, so get rid of these. _yarn-offline-mirror/_ is my local, offline dependencies folder that I mainain for my system. You probably want to make your own.

---

**Assumption**: You're running a Windows 7 machine.

The starter kits can be found in the _app\_\*_ folders. Each project is documented by a matching MD file in _Documentation/\*_. Each kit is documented according to:

1. The product intended to be created.
1. How the kit answers The Checklist.
1. What workflows are available (as instantiated in the `"scripts"` section of `package.json`).

Before diving into the individual kit, please read the following documents:

1. _Windows System Setup_: Chocolatey, PowerShell, basic VSC setup, and, optionally, Yarn.
1. _VS Code Extensions_: A list of the VSC extensions I've found useful. `vscodeextensions.bat` is meant to install all of them in one shot, sequentially.
1. _Checklist Overview_: In this section, I go through each checklist item and provide some answers with sources.

There is another file I'm maintaining called _Weird Facts_, which is a collection of interesting things that I feel I might forget.

<!-- 12. ReactJS support
//Runtime dependencies
> npm install --save react react-dom eslint-plugin-react
> install-peerdeps eslint-plugin-react
If you want to avoid ES2015 class syntax:
> npm install create-react-class
Add Babel support for ReactJS
> npm install babel-preset-react -->
