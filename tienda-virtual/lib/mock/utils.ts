export async function simulateDelay(ms = 220): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function deepClone<T>(value: T): T {
  return structuredClone(value);
}

export function nextCorrelative(prefix: string, id: number): string {
  return `${prefix}-${String(id).padStart(5, "0")}`;
}
