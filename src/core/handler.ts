import Reader from 'libs/reader';
import print from 'libs/console';

export default class Handler {
  private readonly file: Reader = new Reader('./src/commands/');

  public async init() {
    const read = await this.file.read();
    print(read);
  }
}