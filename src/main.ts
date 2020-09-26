import print from 'libs/console';
import File from 'libs/file';

const reader: File = new File('tests/libs/content/append.txt');
reader.replace({ from: 'test', to: 'eheh', flags: 'g' });
print(process.cwd(), __dirname);