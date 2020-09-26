import { readFile, unlink, writeFile } from 'fs';
import { File } from 'typings/file';

export default class Reader {
  // Defining file variable
  private file: File = {
    name: '',
    content: '',
  };

  constructor(fileName: string) {
    // Setting global file variable to file name argument
    this.file.name = fileName;
  }

  public read(): Promise<string> {
    // Returning promise
    return new Promise((resolve: Function, reject: Function): void => {
      // Reading global file
      readFile(this.file.name, 'utf-8', (error: Error, content: string): void => {
        // If any error then rejecting promise
        if (error) reject(error);
        // Else setting global file content to new read content;
        this.file.content = content;
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
      writeFile(this.file.name, parsedContent, (error: Error) => {
        // If any error then rejecting promise
        if (error) reject(error);
        // Else defining new global file content
        this.file.content = parsedContent;
        // Else resolving true
        resolve(true);
      });
    });
  }

  public delete(): Promise<Error | Boolean> {
    // Returning promise
    return new Promise((resolve: Function, reject: Function): void => {
      // Deleting the specified file
      unlink(this.file.name, (error: Error): void => {
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
      // Getting file content from global variable
      const fileContent: Array<string> = this.file.content.split(/\r?\n/g);
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
    });
  }
}
