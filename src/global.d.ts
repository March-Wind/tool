declare global {
  interface Window {
  }
}
type Writeable<T extends { [x: string]: any }> = {
  -readonly [P in keyof T]: T[P];
}

