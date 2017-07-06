const XLSX = require('xlsx');
const Fs = require('fs');

const input = './test.xlsx';
const output = './output.csv';

const workbook = XLSX.readFile(input);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const stream = XLSX.stream.to_csv(worksheet, {
  FS: ';',
  RS: '\n',
  dateNF: 'dd.mm.yyyy',   // <--- Seems to be ignored.
  strip: false,
  blankrows: true
});

stream.pipe(Fs.createWriteStream(output))
  .on('finish', () => {
    console.log(output, 'written');
  });