/**
 * create-kamyar [name] [--template client|server|both] [--repo <url>]
 *               [--yes] [--no-install]
 */
export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--template" || arg === "-t") args.template = argv[++i];
    else if (arg.startsWith("--template=")) args.template = arg.split("=")[1];
    else if (arg === "--repo" || arg === "-r") args.repo = argv[++i];
    else if (arg.startsWith("--repo=")) args.repo = arg.slice("--repo=".length);
    else if (arg === "--yes" || arg === "-y") args.yes = true;
    else if (arg === "--no-install") args.install = false;
    else if (!arg.startsWith("-")) args.name = arg;
  }
  return args;
}
