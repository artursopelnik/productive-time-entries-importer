import 'dotenv/config';
import fs from 'fs';
import directoryPath from './getTimeEntriesDirectory';
import { DateTime } from 'luxon';
import { TypedProcess } from './env';
import postData from './postData';

const { PRODUCTIVE_ENTRY_DATE, PRODUCTIVE_ENTRY_TIME, PRODUCTIVE_ENTRY_NOTE } =
  (process as TypedProcess).env;

type TypedTimeEntry = Record<string, string>;

const importTimeEntries = (arr: TypedTimeEntry[]) => {
  const entriesWithDate = arr.filter(
    (el: TypedTimeEntry) =>
      el['Datum'] !== undefined && typeof el['Datum'] === 'string'
  );

  entriesWithDate.map((el: TypedTimeEntry) => {
    const time: string | undefined = PRODUCTIVE_ENTRY_TIME
      ? el[PRODUCTIVE_ENTRY_TIME]
      : undefined;
    const date: string | undefined = PRODUCTIVE_ENTRY_DATE
      ? el[PRODUCTIVE_ENTRY_DATE]
      : undefined;
    const note: string | undefined = PRODUCTIVE_ENTRY_NOTE
      ? el[PRODUCTIVE_ENTRY_NOTE]
      : undefined;

    let parsedDate: DateTime | undefined;

    if (date !== undefined) {
      const fromISO = DateTime.fromISO(date);

      if (fromISO.isValid) {
        parsedDate = fromISO;
      } else {
        // fallback dateFormat dd.MM.yyyy
        const fromFormat = DateTime.fromFormat(date, 'dd.MM.yyyy');
        if (fromFormat.isValid) {
          parsedDate = fromFormat;
        }
      }
    }

    if (time === undefined) {
      return;
    }

    if (parsedDate === undefined) {
      return;
    }

    if (!parsedDate.isValid) {
      return;
    }

    const postDate = parsedDate.toISODate();

    if (postDate === null) {
      return;
    }

    return postData(postDate, time, note);
  });
};

fs.readdir(directoryPath, (err?: unknown, files?: string[]) => {
  if (err || !files) {
    return console.log('Error - Unable to scan directory: ' + err);
  }

  const jsonFiles: string[] = files.filter((file: string) =>
    file.includes('.json')
  );

  if (jsonFiles.length === 0) {
    return console.log(
      'No json could be found in the time-entries directory. Please run npm run convert first.'
    );
  }

  jsonFiles.map((file) => {
    const jsonFilePath: string = directoryPath + '/' + file;

    try {
      const data: string = fs.readFileSync(jsonFilePath, 'utf8');
      return importTimeEntries(JSON.parse(data));
    } catch (err) {
      return console.log('Error - Unable to read file: ' + err);
    }
  });
});
