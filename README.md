## Developing

“This project uses pnpm as the package manager for efficiency and disk-space savings. 
You can install it with `npm install -g pnpm`, or run with your preferred package manager.”

installed dependencies with `pnpm install` 

start a development server:

```sh
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```sh
pnpm build
```

## Story Book
Open Story book to see all the component Documents

```sh
pnpm storybook
```

## Unit Test

```sh
pnpm vitest
```
```sh
pnpm vitest --ui
```

## Playwright Test

```sh
pnpm test:e2e
```
```sh
pnpm test:e2e --ui
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
