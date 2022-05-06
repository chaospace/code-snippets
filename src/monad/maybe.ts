import isNullOrUndefined from '@/utils/isNullOrUndefined';

// maybe
class Maybe<T extends unknown> {
  private _value: T;
  constructor(value: T) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  map<R>(fn: (value: T) => R): Maybe<R | null> {
    return isNullOrUndefined(this._value) ? Maybe.nothing() : Maybe.of(fn(this._value));
  }

  static of<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static nothing() {
    return new Maybe(null);
  }
}

export default Maybe;
