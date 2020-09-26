import { readFile, writeFile } from 'fs';

export default class File {
  // Defining file name variable
  private file: string;

  constructor(fileName: string) {
    // Setting global file variable to file name argument
    this.file = fileName;
  }

  public read(): Promise<string> {
    // Returning promise
    return new Promise((resolve: Function, reject: Function): void => {
      // Reading global file
      readFile(this.file, 'utf-8', (error: Error, content: string): void => {
        // If any error then rejecting promise
        if (error) reject(error);
        // Else resolving content
        resolve(content);
      });
    });
  }

  public write(...content: Array<any>): Promise<Error | Boolean> {
    // Returning promise
    return new Promise((resolve: Function, reject: Function): void => {
      // Parsing arguments
      const parsedContent: string = content.join('\n');
      // Writing to global file
      writeFile(this.file, parsedContent, (error: Error) => {
        // If any error then rejecting promise
        if (error) reject(error);
        // Else resolving true
        resolve(true);
      });
    });
  }
}
