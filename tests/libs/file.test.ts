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
});
