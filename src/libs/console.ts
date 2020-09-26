/**
 * @function print
 * @param {Array<any>} args
 * @author NessMC
 */
export default function print(...args: Array<any>): void {
  // Looping function arguments
  args.map((argument: any): boolean => {
    // Printing arguments with space at the end
    process.stdout.write(`${argument} `);
    return true;
  });
  // Printing new line character
  process.stdout.write('\n');
}
