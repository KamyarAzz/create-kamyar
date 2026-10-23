/** Returns an error message, or undefined when the name is fine. */
export function validateName(name) {
  if (!/^[a-z0-9][a-z0-9-._]*$/.test(name)) {
    return "Use lowercase letters, numbers, dashes, dots or underscores.";
  }
}

/** "my-cool-app" → "My Cool App" */
export function toTitle(name) {
  return name
    .split(/[-._]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
