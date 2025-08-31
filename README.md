# My BidOne code test - SvelteKit Project [APP PROD LINK](https://aj-articles.netlify.app/)

A modern web application built with [SvelteKit](https://kit.svelte.dev/), [TailwindCSS](https://tailwindcss.com/), and tested with [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/), and other tools [Vite](https://vite.dev/), [Storybook](https://storybook.js.org/), [mockapi.oi](https://mockapi.io/).  
This project follows best practices for scalability, performance, and developer experience.

## Features

- View a paginated list of articles
- Search and filter articles
- Add, Edit and Delete article
- Loading and Error states
- unit test (Vitest)
- UI test (Playwright)
- Ready-to-use **component library structure**
- Role-based access

## Project Structure

```
aj-bidone-test
├── .env
├── .git
├── .gitignore
├── .husky
│   ├── .pre-commit
├── .npmrc
├── .prettierignore
├── .prettierrc
├── .storybook
│   ├── main.ts
│   └── preview.ts
├── .svelte-kit
├── README.md
├── e2e
│   ├── articles
│   ├── buttonTabFlow.spec.ts
│   └── home.test.ts
├── eslint.config.js
├── node_modules
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── src
│   ├── app.css
│   ├── app.d.ts
│   ├── app.html
│   ├── lib
│   │   ├── api
│   │   │   ├── articleService.ts
│   │   │   └── userService.ts
│   │   ├── assets
│   │   │   └── aj_fav.ico
│   │   ├── components
│   │   │   ├── Input.svelte
│   │   │   ├── Loader.svelte
│   │   │   ├── Modal.svelte
│   │   │   ├── Nav.svelte
│   │   │   ├── Notifications.svelte
│   │   │   └── button
│   │   │       ├── Button.spec.ts
│   │   │       ├── Button.stories.svelte
│   │   │       └── Button.svelte
│   │   ├── index.ts
│   │   ├── stores
│   │   │   ├── article.ts
│   │   │   ├── global.ts
│   │   │   ├── notifications.ts
│   │   │   └── user.ts
│   │   └── utils
│   │       ├── apiCall.ts
│   │       ├── configs.ts
│   │       ├── constants.ts
│   │       ├── helper.ts
│   │       ├── types.ts
│   │       └── validators.ts
│   ├── routes
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   └── articles
│   │       ├── +page.server.ts
│   │       ├── +page.svelte
│   │       └── +page.ts
│   └── setupTests.ts
├── static
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Developing

“This project uses pnpm as the package manager for efficiency and disk-space savings.
You can install it with `npm install -g pnpm`, or run with your preferred package manager.”

- Install dependencies with 

```sh
pnpm install
```
- start a development server:

```sh
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm build

# or You can preview the production build with 
npm run preview
```

## Story Book

Open Story book to see all the component Documents

```sh
pnpm storybook
```

## Unit Test

```sh
pnpm vitest

pnpm vitest --ui

pnpm vitest --coverage 
```

## Playwright Test

```sh
pnpm test:e2e

pnpm test:e2e --ui
```