import {run} from "./run.js";

/** Uses whichever package manager ran us (npm create / pnpm create / …). */
export function detectPackageManager() {
  const agent = process.env.npm_config_user_agent ?? "";
  if (agent.startsWith("pnpm")) return "pnpm";
  if (agent.startsWith("yarn")) return "yarn";
  if (agent.startsWith("bun")) return "bun";
  return "npm";
}

export function install(pm, cwd) {
  return run(pm, ["install"], cwd);
}
