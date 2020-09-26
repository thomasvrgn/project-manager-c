import Reader from 'libs/file';

describe('Reader library testing', () => {
  test('should return text content', async () => {
    const reader: Reader = new Reader('tests/libs/content/test.txt');
    const content: string = await reader.read();
    expect(content).toEqual('bruh');
  });
  test('should throw an error when file does not exists', async () => {
    const reader: Reader = new Reader('fileThatDoesNotExist');
    expect(reader.read()).rejects.toThrowError();
  });
});
