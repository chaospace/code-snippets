function hasProperty<T, K = keyof T>(o: T, key: K) {
  return Object.prototype.hasOwnProperty.call(o, key);
}

export default hasProperty;
