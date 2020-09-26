import { readFile, writeFile } from 'fs';

export default class File {
  private file: string;

  constructor(fileName: string) {
    this.file = fileName;
  }

  public read(): Promise<string> {
    return new Promise((resolve: Function, reject: Function): void => {
      readFile(this.file, 'utf-8', (error: Error, content: string): void => {
        if (error) reject(error);
        resolve(content);
      });
    });
  }

  public write(...content: Array<any>): Promise<Error | Boolean> {
    return new Promise((resolve: Function, reject: Function): void => {
      const parsedContent: string = content.join('\n');
      writeFile(this.file, parsedContent, (error: Error) => {
        if (error) reject(error);
        resolve(true);
      });
    });
  }
}