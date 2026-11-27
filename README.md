# site-astro

source code for francescojames.dev — my portfolio and blog

## what's in here

my personal website. i'm francesco, a cloud engineer and developer from
italy. the about page has the longer story and my cv, plus there
are works, skills and a few blog posts.

## tech stack

- astro
- tailwindcss
- daisyui

## development and CI

Use Node.js 26 LTS (`.nvmrc`) and Yarn Berry 4.12.0 (pinned in
`package.json` and `.yarnrc.yml`). Node 26 does not bundle Corepack, so install
it explicitly:

```sh
npm install --global corepack@0.36.0
corepack enable
corepack install
yarn install --immutable
yarn astro check
yarn build
```

When intentionally changing dependencies, run `yarn add` / `yarn remove` (or
`yarn install` locally), then commit **both `package.json` and `yarn.lock`**.
CI keeps `--immutable` enabled: it permits creating `node_modules` and build
output, but refuses to rewrite the lockfile. Do not run `yarn set version` or
`corepack use` in CI; the Yarn version is already committed.

## TODO

- [x] add first blog post
- [ ] add an rss feed
- [ ] handle tags in posts
- [ ] link other stuff (see about.astro)
- [ ] maybe optimize the intersection observer, could be useless on smaller screens
