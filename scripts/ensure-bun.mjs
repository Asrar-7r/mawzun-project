#!/usr/bin/env node
/**
 * Bun-only guard.
 *
 * This project ships a `bun.lock` lockfile and is installed with Bun only.
 * The script runs as the `preinstall` lifecycle script, so it also executes
 * when Bun itself installs the dependencies.
 *
 * How it works: every package manager exports `npm_config_user_agent`
 * (for example "bun/1.4.2 npm/? node/v24.18.0 linux x64"). When that value is
 * present and identifies npm, yarn or pnpm, the install is refused.
 * When the variable is absent (lifecycle script invoked by another tool, bare
 * CI runner, ...) the check fails open so the project stays installable.
 */

const BLOCKED_PACKAGE_MANAGERS = ["npm", "yarn", "pnpm"];

const userAgent = process.env.npm_config_user_agent ?? "";
const packageManager = userAgent.split(/[/\s]/, 1)[0].trim().toLowerCase();

if (BLOCKED_PACKAGE_MANAGERS.includes(packageManager)) {
  console.error(
    [
      "",
      `✖ This repository is Bun-only — "${packageManager}" is not allowed.`,
      "",
      "  Install the dependencies with Bun instead:",
      "",
      "    bun install",
      "",
    ].join("\n"),
  );
  process.exit(1);
}
