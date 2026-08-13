const SECRET = process.env.QUANTUM_API_SECRET;

export type AuthResult = "ok" | "unconfigured" | "denied";

// Checks the shared bearer the Quantum app uses for every route it pushes to
export function authorise(header: string | undefined): AuthResult {
  if (!SECRET) return "unconfigured";
  return header === `Bearer ${SECRET}` ? "ok" : "denied";
}
