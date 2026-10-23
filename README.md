# create-kamyar

Scaffolds a new project with my stack, folder structure and tooling already
set up, so I don't have to install and configure the same things every time.

```bash
npm create kamyar@latest my-app
```

## Templates

| Option            | Status      | What you get                                                                            |
| ----------------- | ----------- | --------------------------------------------------------------------------------------- |
| Frontend (client) | Ready       | React 19, Vite, TypeScript, Tailwind v4, React Router, Zustand, lucide-react            |
| Backend (server)  | Coming soon |                                                                                         |
| Both (monorepo)   | Coming soon | npm workspaces with `client/` and `server/`                                             |

Every project also gets ESLint, Prettier (with Tailwind class sorting), Husky +
lint-staged, EditorConfig, VS Code settings and a `CLAUDE.md` with the project
conventions.

## Options

```bash
npm create kamyar@latest my-app -- --template client --yes
```

- `--template`, `-t` – `client`, `server` or `both`
- `--repo`, `-r` – git remote URL to link the project to
- `--yes`, `-y` – skip the questions and use the defaults
- `--no-install` – skip `npm install` (mostly for testing the templates)

Every project gets `git init` on a `main` branch, because the Husky hooks need
it. If you give a repo URL, it's added as `origin` and `git push` is set up to
work on the first push, so you can commit and push right away.

## Working on the templates

Templates live in `templates/`. `base/` is copied into every project, then the
chosen template on top of it. In template files, `__APP_NAME__` becomes the
project name (`my-app`) and `__APP_TITLE__` the title (`My App`). Files that
npm won't publish (like `.gitignore`) are stored as `_gitignore` and renamed
when copied.

Try it locally:

```bash
node index.js ../test-app --template client --yes
```
