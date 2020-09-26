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

  public append(...content: Array<any>): Promise<Error | Boolean> {
    // Returning promise
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
      try {
        // Trying reading file
        const fileContent: Array<string> = await (await this.read()).split(/\r?\n/g);
        // Parsing readed content and arguments
        const appendedFileContent: Array<any> = fileContent.concat(...content);
        try {
          // Trying writing appended file content
          await this.write(appendedFileContent);
          // Resolving true.
          resolve(true);
        } catch (exception: unknown) {
          // Catching and rejecting exception
          reject(exception);
        }
      } catch (exception: unknown) {
        // Catching and rejecting exception
        reject(exception);
      }
    });
  }
}
