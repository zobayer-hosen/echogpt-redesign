/**
 * Collision-resistant id. `crypto.randomUUID` only exists in secure contexts,
 * so fall back to a random string when the app is opened over plain HTTP on a LAN.
 */
export function createId(prefix = "") {
  const random =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID().replaceAll("-", "").slice(0, 16)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  return prefix ? `${prefix}_${random}` : random;
}
