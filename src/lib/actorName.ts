export function sanitizeActorNameInput(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

export function normalizeActorNameForMatch(value: string): string {
  return sanitizeActorNameInput(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}
