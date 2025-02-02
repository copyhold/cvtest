interface Array<T> {
  toSorted(compareFn: (a: T, b: T) => -1 | 0 | 1): Array<T>;
}
