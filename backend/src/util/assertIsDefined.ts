// This function allows to pass any type to it and checks if the type is not null
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  // if val is undefined or null then throw error
  if (!val) {
    throw Error("Excepted 'val' to be defined but received" + val);
  }
}
