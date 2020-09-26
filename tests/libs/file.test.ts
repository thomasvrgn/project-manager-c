import Reader from 'libs/file';

// Main tests category
describe('#Reader library testing', () => {
  // Reader method tests
  describe('#Reading', () => {
    // Testing if reader return correct text
    test('should return text content', async () => {
      const reader: Reader = new Reader('tests/libs/content/test.txt');
      const content: string = await reader.read();
      // Expecting reader to return "bruh" content
      expect(content).toEqual('bruh');
    });
    // Testing if reader throw an error
    test('should throw an error when file does not exists', async () => {
      const reader: Reader = new Reader('fileThatDoesNotExist');
      // Expecting reader to throw an error
      expect(reader.read()).rejects.toThrowError();
    });
  });
  describe('#Writing', () => {
    test('should create a new file or updating a file', async () => {
      const filePath: string = 'tests/libs/content/newFile.txt';
      const reader: Reader = new Reader(filePath);
      reader.write('Hello world');
      expect(reader.read()).resolves.toBe('Hello world');
    });
  });
  describe('#Deleting', () => {
    const filePath: string = 'tests/libs/content/newFile.txt';
    const reader: Reader = new Reader(filePath);
    test('should delete file', async () => {
      expect(reader.delete()).resolves.toBeTruthy();
    });
    test('should not more exist', async () => {
      expect(reader.read()).rejects.toThrowError();
    });
  });
});
