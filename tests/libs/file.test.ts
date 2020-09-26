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
  // Writer method tests
  describe('#Writing', () => {
    // Testing if reader correctly creating a new file
    test('should create a new file', async () => {
      const filePath: string = 'tests/libs/content/newFile.txt';
      const reader: Reader = new Reader(filePath);
      reader.write('Hello world');
      // Expecting reader to resolve "Hello world" value
      expect(reader.read()).resolves.toBe('Hello world');
    });
  });
  // Deleter method tests
  describe('#Deleting', () => {
    const filePath: string = 'tests/libs/content/newFile.txt';
    const reader: Reader = new Reader(filePath);
    // Testing if reader theoretically deletes a file
    test('should delete file', async () => {
      // Expecting reader to resolve true
      expect(reader.delete()).resolves.toBeTruthy();
    });
    // Testing if reader correctly delete a file
    test('should not more exist', async () => {
      // Expecting reader to throw error when trying reading file
      expect(reader.read()).rejects.toThrowError();
    });
  });
  // Appender method tests
  describe('#Appending', () => {
    test('should append text at the end of a file', async () => {
      const reader: Reader = new Reader('tests/libs/content/append.txt');
      await reader.append('test');
    });
  });
});
