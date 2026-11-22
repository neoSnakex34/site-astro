# site-astro

source code for francescojames.dev — my portfolio and blog

## what's in here

the landing page does this little customer-developer chat bit, supposed to be a funny way to show what i do. there's also an about section where i talk about myself as a jack of all trades: frontend work, full-stack stuff, cloud things. and hardware. i like fixing hardware.

the blog is there too if you're into that.

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

### upstream → master

`.github/workflows/main.yml` runs whenever a push or PR merge updates the
`upstream` branch, including the first merge of this configuration. It:

1. Checks out the exact triggering commit and fetches `master`.
2. Merges that commit into a local `master`, preserving both branches' history.
3. Installs the pinned Yarn through Corepack, installs dependencies immutably,
   type-checks, and builds the merged result with Node 26.
4. Pushes to `master` only if every preceding step succeeds.

There is no separate one-time migration job. First merge the workflow changes
into `master` manually (the automatic token cannot push workflow-file changes).
Then updates to `upstream` automatically promote application changes to `master`. The workflow can also be dispatched manually against
`upstream` once GitHub exposes it in the Actions UI (manual dispatch requires
the workflow to exist on the default branch).

Repository configuration required:


- No custom token or secret is required: checkout and push use GitHub's automatic,
  short-lived `GITHUB_TOKEN` with `contents: write`.
- Branch rules on `master` must allow GitHub Actions to push these merges;
  workflow YAML cannot bypass repository protection rules by itself.
- `GITHUB_TOKEN` cannot push changes to `.github/workflows`. Merge workflow changes
  into `master` manually first, including this initial setup.
- Pushes to `master` made with `GITHUB_TOKEN` do not trigger downstream push
  workflows. Deployment must run in this workflow if it depends on promotion.
- Merge conflicts fail the job without pushing. Resolve them on `upstream` and
  push again. If another writer updates `master` during validation, the normal
  push safely fails rather than force-pushing; rerun the job to test a new merge.
- Pushes to `upstream` made by another workflow using `GITHUB_TOKEN` do not
  trigger this workflow. Use a PAT / GitHub App token for automated source pushes.

## TODO

- [x] add first blog post
- [ ] add an rss feed
- [ ] handle tags in posts
- [ ] link other stuff (see about.astro)
- [ ] maybe optimize the intersection observer, could be useless on smaller screens
