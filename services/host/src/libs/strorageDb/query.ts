import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './schema';
import { getCookie } from '../hooks/useCookies';
import _ from 'lodash';
import axios from 'axios';

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
  const getObservable = useLiveQuery(() =>
    db.lang
      .where('key')
      .equalsIgnoreCase(`${lang}`)
      .toArray(),
  );

  const trans = (textId: string) => {
    try {
      const values = getObservable?.[0].values[textId] ?? '';
      console.log(getObservable, lang, 'hollaXXXX', values);
      return values;
    } catch {
      return '';
    }
  };

  return { getObservable, trans };
}

export const isAnyField = async (lagId: string): Promise<boolean> => {
  try {
    const isA = await db
      .table(`lang`)
      .where('key')
      .equalsIgnoreCase(`${lagId}`)
      .count();
    return isA > 0;
  } catch {
    return false;
  }
};

export const mappingObj = async (): Promise<any> => {
  try {
    const isA = await db.lang.toArray();
    let paramsVal = isA;
    let output = {};

    paramsVal.forEach(({ key, values }) => {
      output[key] = values;
    });

    return output;
  } catch {
    return {};
  }
};

export async function addFieldToIndexedDB(tableName: string, data: any) {
  const isAny = await db
    .table(`${tableName}`)
    .where('key')
    .equalsIgnoreCase(`${data.key}`)
    .count();

  console.log(isAny, 'hahahahahah');

  if (isAny === 0) {
    console.log('add');
    return new Promise((resolve, reject) => {
      db.table(`${tableName}`)
        .add(data)
        .then(data => {
          resolve(data);
        });
      console.log('added');
    });
  } else {
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

export const fetchAPI = async () => {
  const startTime = performance.now();
  const lang = getCookie('lang') ?? 'EN';
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://sf7dev-pro.dataon.com/sfpro/',
      params: {
        ofid: 'SFTranslation.GetLangUI',
        thelang: lang,
      },
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    });

    if (res) {
      const mlang = res.data.DATA.RESULT;
      addFieldToIndexedDB('lang', { key: lang, last_update: new Date(), values: mlang });
      return true;
    }
  } catch {
    console.error('error failed fetch api lang');
    return false;
  } finally {
    const endTime = performance.now();
    console.log(`Call to fetch-lang took ${endTime - startTime} milliseconds`);
  }
};
