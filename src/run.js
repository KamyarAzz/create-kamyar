import {spawnSync} from "node:child_process";

/** Runs a command quietly and returns whether it succeeded. */
export function run(command, args, cwd) {
  // shell is needed on Windows, where npm is npm.cmd
  const result = spawnSync(command, args, {
    cwd,
    stdio: "ignore",
    shell: process.platform === "win32",
  });
  return result.status === 0;
}
