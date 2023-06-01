import fs from 'fs';
import csv from 'csvtojson';
import directoryPath from './getTimeEntriesDirectory';

fs.readdir(directoryPath, (err?: unknown, files?: string[]) => {
  if (err || !files) {
    return console.log('Unable to scan directory: ' + err);
  }

  const csvFiles: string[] = files.filter((file: string) =>
    file.includes('.csv')
  );

  if (csvFiles.length === 0) {
    return console.log(
      'No csv could be found in the time-entries directory. Please run *npm run convert* first.'
    );
  }

  csvFiles.map(async (file: string) => {
    const csvFilePath = directoryPath + '/' + file;
    const fileName = file.split('.csv')[0];
    const jsonObj = await csv().fromFile(csvFilePath);
    const jsonFile = directoryPath + '/' + fileName + '.json';

    fs.writeFile(jsonFile, JSON.stringify(jsonObj), function (err?: unknown) {
      if (err) throw err;
      console.log('File is created successfully.');
    });
  });
});
