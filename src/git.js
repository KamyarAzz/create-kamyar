import {run} from "./run.js";

/** Accepts https://…, git@host:… and ssh://… URLs */
export function validateRepoUrl(url) {
  if (url && !/^(https:\/\/|git@|ssh:\/\/)\S+$/.test(url)) {
    return "Use an https://, git@ or ssh:// URL, or leave it empty.";
  }
}

export function gitInit(cwd) {
  return run("git", ["init", "-q", "-b", "main"], cwd);
}

/** Links the repo to a remote so the first `git push` just works. */
export function linkRemote(cwd, url) {
  return (
    run("git", ["remote", "add", "origin", url], cwd) &&
    run("git", ["config", "push.autoSetupRemote", "true"], cwd)
  );
}
