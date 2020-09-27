export interface File {
  name: string,
  extension?: string | null,
  content: string | Array<string>,
}