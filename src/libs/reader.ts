import { rejects } from 'assert';
import { readFile, stat, Stats, unlink, writeFile } from 'fs';
import { File } from 'typings/file';
import { Replace } from 'typings/replace';

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
      if (this.file.content.length === 0) await this.read();
      // Getting file content from global variable
      const fileContent: Array<string> = this.file.content.split(/\r?\n/g);
      // Parsing readed content and arguments
      const appendedFileContent: Array<any> = fileContent.concat(...content);
      try {
        // Trying writing appended file content
        await this.write(...appendedFileContent);
        // Resolving true.
        resolve(true);
      } catch (exception: unknown) {
        // Catching and rejecting exception
        reject(exception);
      }
    });
  }

  public prepend(...content: Array<any>): Promise<Error | Boolean> {
    // Returning promise
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
      if (this.file.content.length === 0) await this.read();
      // Getting file content from global variable
      const fileContent: Array<string> = this.file.content.split(/\r?\n/g);
      // Parsing readed content and arguments
      const prependedFileContent: Array<any> = content.concat(...fileContent);
      try {
        // Trying writing prepended file content
        await this.write(...prependedFileContent);
        // Resolving true.
        resolve(true);
      } catch (exception: unknown) {
        // Catching and rejecting exception
        reject(exception);
      }
    });
  }

  public replace(...replaces: Array<Replace>): Promise<Error | Boolean> {
    // Returning promise
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
      // Setting file content if global file variable is empty
      if (this.file.content.length === 0) await this.read();
      // Looping replaces items
      replaces.map(async (replace: Replace): Promise<Boolean> => {
        const {
          from,
          to,
          flags,
        } = replace;
        // Building regex
        const regex: RegExp = new RegExp(from, flags);
        // Replacing global file content regex with corresponding value
        this.file.content = this.file.content.replace(regex, to);
        try {
          // Writing new replaced file content
          await this.write(...this.file.content.split(/\r?\n/g));
          resolve(true);
        } catch (exception: unknown) {
          // Rejecting exception
          reject(exception);
        }
        return true;
      });
    });
  }

  public stats(): Promise<Stats> {
    return new Promise((resolve: Function, reject: Function) => {
      stat(this.file.name, (error: Error, stats: Stats) => {
        if (error) reject(error);
        resolve(stats);
      });
    });
  }
}
