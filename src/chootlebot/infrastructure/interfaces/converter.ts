export interface Converter<S, T> {
  to(source: S): { target?: T, err?: Error };
  from(target: T): { source?: S, err?: Error };
}
