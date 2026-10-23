import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const templatesDir = fileURLToPath(new URL("../templates", import.meta.url));

// npm drops dotfiles like .gitignore when publishing, so templates store
// them with a "_" prefix and they get renamed here.
const renames = {_gitignore: ".gitignore"};

const textExtensions = new Set([
  ".css", ".html", ".js", ".json", ".md", ".ts", ".tsx", "",
]);

export function scaffold({template, targetDir, name, title}) {
  fs.mkdirSync(targetDir, {recursive: true});
  fs.cpSync(path.join(templatesDir, "base"), targetDir, {recursive: true});
  fs.cpSync(path.join(templatesDir, template), targetDir, {recursive: true});
  finalize(targetDir, {__APP_NAME__: name, __APP_TITLE__: title});
}

/** Renames placeholder files and fills in placeholders in every text file. */
function finalize(dir, values) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    let file = path.join(dir, entry.name);
    if (renames[entry.name]) {
      const renamed = path.join(dir, renames[entry.name]);
      fs.renameSync(file, renamed);
      file = renamed;
    }
    if (entry.isDirectory()) {
      finalize(file, values);
    } else if (textExtensions.has(path.extname(file))) {
      const content = fs.readFileSync(file, "utf8");
      let next = content;
      for (const [key, value] of Object.entries(values)) {
        next = next.replaceAll(key, value);
      }
      if (next !== content) fs.writeFileSync(file, next);
    }
  }
}
