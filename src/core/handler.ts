import Reader from 'libs/reader';
import print from 'libs/console';

export default class Handler {
  private readonly file: Reader = new Reader('./src/commands/');

  public async init() {
    const read: Array<string> = await this.file.read() as Array<string>;
    read.map((file: string): boolean => {
      const fileReader: Reader = new Reader(`./src/commands/${file}`);
      if (fileReader.extension !== '.ts') return true;
      print(fileReader.extension);
      return true;
    });
  }
}