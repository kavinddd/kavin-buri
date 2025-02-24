export function formatNumber(n: number, precision?: number): string {
  return n.toFixed(precision ?? 2)
}
