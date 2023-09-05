export {};
declare global {
  type Modifiy<T, R> = Omit<T, keyof R> & R;
}
