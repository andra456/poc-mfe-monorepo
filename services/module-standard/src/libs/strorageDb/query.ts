import { liveQuery } from 'dexie';
import { db } from './schema';
import { getCookie } from '../hooks/useCookies';

export function addBulkDataToIndexedDB(tableName: string, data: any) {
  return new Promise((resolve, reject) => {
    db.table(`${tableName}`)
      .bulkAdd(data)
      .then(data => {
        resolve(data);
      });
  });
}

export function useLang() {
  const lang = getCookie('lang');
  const getObservable: any = liveQuery(() =>
    db
      .table(`lang`)
      .where('key')
      .equalsIgnoreCase(`${lang}`)
      .toArray(),
  ).subscribe({
    next: result => console.log('Got result:', JSON.stringify(result)),
    error: error => console.error(error),
  });

  const getTextLang = (textId: string) => {
    const values = getObservable?.values[textId] ?? '';
    return values;
  };

  return { getObservable, getTextLang };
}

export async function addFieldToIndexedDB(tableName: string, data: any) {
  const isAny = await db
    .table(`${tableName}`)
    .where('key')
    .equalsIgnoreCase(`${data.key}`)
    .toArray();

  console.log(isAny);

  if (isAny.length === 0) {
    return new Promise((resolve, reject) => {
      db.table(`${tableName}`)
        .add(data)
        .then(data => {
          resolve(data);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
}

// We may write query methods later
export function getAllFromIndexedDB(tableName: string) {
  return new Promise((resolve, reject) => {
    db.table(`${tableName}`)
      .toArray()
      .then(data => {
        resolve(data);
      });
  });
}

export function fetchAPI(apiURL: string) {
  return new Promise((resolve, reject) => {
    fetch(`${apiURL}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.json());
        } else {
          const error: any = new Error(`HTTP Error ${response.statusText}`);
          error.status = response.statusText;
          error.response = response;
          console.log(error);
          throw error;
        }
      })
      .catch(error => {
        console.log('errors');
        reject(error);
      });
  });
}
