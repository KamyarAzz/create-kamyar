import * as p from "@clack/prompts";
import pc from "picocolors";
import fs from "node:fs";
import path from "node:path";
import {parseArgs} from "./args.js";
import {scaffold} from "./scaffold.js";
import {detectPackageManager, install} from "./install.js";
import {gitInit, linkRemote, validateRepoUrl} from "./git.js";
import {toTitle, validateName} from "./names.js";

const templates = [
  {value: "client", label: "Frontend (client)", hint: "React + Vite"},
  {value: "server", label: "Backend (server)", hint: "coming soon"},
  {value: "both", label: "Both (monorepo)", hint: "coming soon"},
];

export async function main() {
  const args = parseArgs(process.argv.slice(2));
  p.intro(pc.bgGreen(pc.black(" create-kamyar ")));

  const input =
    args.name ??
    (args.yes
      ? "my-app"
      : check(
          await p.text({
            message: "Project name?",
            placeholder: "my-app",
            defaultValue: "my-app",
            validate: (value) =>
              validateName(path.basename(path.resolve(value || "my-app"))),
          }),
        ));
  // The name can be a path (../my-app); the package is named after the folder
  const targetDir = path.resolve(input);
  const name = path.basename(targetDir);
  const nameError = validateName(name);
  if (nameError) fail(nameError);

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    fail(`Folder "${input}" already exists and is not empty.`);
  }

  const template =
    args.template ??
    (args.yes
      ? "client"
      : check(await p.select({message: "What are you building?", options: templates})));
  if (!templates.some((t) => t.value === template)) {
    fail(`Unknown template "${template}". Use client, server or both.`);
  }
  if (template !== "client") {
    fail(`The "${template}" template isn't ready yet. Use client for now.`);
  }

  const repoUrl = (
    args.repo ??
    (args.yes
      ? ""
      : check(
          await p.text({
            message: "Git repo URL? (press Enter to skip)",
            placeholder: "https://github.com/you/my-app.git",
            defaultValue: "",
            validate: (value) => validateRepoUrl(value?.trim()),
          }),
        )) ??
    ""
  ).trim();
  const repoError = validateRepoUrl(repoUrl);
  if (repoError) fail(repoError);

  const spinner = p.spinner();
  spinner.start("Copying files");
  scaffold({template, targetDir, name, title: toTitle(name)});
  spinner.stop("Files copied");

  // Always a local repo: Husky's git hooks need .git, and it must exist
  // before install so Husky's prepare script can find it
  const hasGit = gitInit(targetDir);
  if (!hasGit) p.log.warn("git init failed, is git installed?");
  if (hasGit && repoUrl) {
    if (linkRemote(targetDir, repoUrl)) p.log.success(`Linked to ${repoUrl}`);
    else p.log.warn("Couldn't add the remote, add it yourself");
  }

  const pm = detectPackageManager();
  const shouldInstall = args.install ?? true;
  if (shouldInstall) {
    spinner.start(`Installing dependencies with ${pm}`);
    const ok = install(pm, targetDir);
    spinner.stop(ok ? "Dependencies installed" : "Install failed, run it yourself");
  }

  const steps = [
    `cd ${path.relative(process.cwd(), targetDir)}`,
    !shouldInstall && `${pm} install`,
    `${pm} run dev`,
  ];
  p.note(steps.filter(Boolean).join("\n"), "Next steps");
  p.outro("Happy building!");
}

function check(value) {
  if (p.isCancel(value)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }
  return value;
}

function fail(message) {
  p.cancel(message);
  process.exit(1);
}
