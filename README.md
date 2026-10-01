This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Package manager: Bun only

This repository is **Bun-only**. `npm`, `yarn` and `pnpm` are not used or supported here:

- the reference lockfile is [`bun.lock`](./bun.lock) (there is no `package-lock.json`, `yarn.lock` or `pnpm-lock.yaml`);
- `package.json` pins the toolchain with `"packageManager": "bun@1.4.2"`;
- the `preinstall` guard at [`scripts/ensure-bun.mjs`](./scripts/ensure-bun.mjs) refuses to install dependencies when the command comes from `npm`, `yarn` or `pnpm`.

```bash
bun install        # install dependencies
bun add <pkg>      # add a dependency
bun add -d <pkg>   # add a dev dependency
bun remove <pkg>   # remove a dependency
bunx <tool>        # run a one-off tool (instead of npx)
bun run lint       # run a script
```

## Getting Started

Install the dependencies with Bun, then run the development server:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the pages by modifying the files under `src/app/`. The page auto-updates as you edit the file.

### Other scripts

```bash
bun run build   # production build
bun run start   # serve the production build
bun run lint    # ESLint over the codebase
```

## Project layout

- `src/app/` — App Router pages: `01-input`, `02-analysis`, `03-constraints`, `04-transformation`
- `src/components/` — layout, stage and UI components
- `src/lib/` — shared helpers (stages, typography, class names)
- `stitch_mawzun/` — original design references
- `archive/` — pre-change file snapshots, kept per the project rules
- `AGENTS.md` — mandatory project rules (Bun-only, tags/archive, branch policy)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Vercel detects Bun through the `packageManager` field and the committed `bun.lock`, so builds run on Bun there as well.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
