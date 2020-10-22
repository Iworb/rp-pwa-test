export function zip<L, R>(arr1: L[], arr2: R[]): [ L, R ][] {
  return arr1.map((k, i) => [k, arr2[i]]);
}

export function unzip<L, R>(arr: [L, R][]): [ L[], R[] ]{
  return arr.reduce(([ l, r ], [a, b]) => [ [...l, a], [...r, b] ], [[], []]);
}
