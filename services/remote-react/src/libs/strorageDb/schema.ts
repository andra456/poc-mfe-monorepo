// db.ts
import Dexie, { Table } from 'dexie';

export interface Languages {
  key: number;
  last_update: string;
  values?: any;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  lang!: Table<Languages>;
  config!: {
    name?: string;
    default_value: any;
    value: any;
  };

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      lang: '&key, last_update, values',
      config: '&name, default_value, values',
    });
  }
}

export const db = new MySubClassedDexie();
