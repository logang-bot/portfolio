/** Applies a shuffled index order to a sign list that may be shorter or longer than the order. */
export function orderedSigns(order: number[], signs: string[]): string[] {
  const shuffled = order.map((i) => signs[i % signs.length])
  return [...shuffled, ...signs.slice(order.length)]
}
