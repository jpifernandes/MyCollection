import Dexie, { Table } from 'dexie';
import { CustomCollection } from '../models/custom-collection.model';
import { MyCollectionSettings } from '../models/my-collection-settings.model';

export class AppDb extends Dexie {

    collections!: Table<CustomCollection, number>;
    settings!: Table<MyCollectionSettings, number>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(3).stores({
            collections: '++id',
            settings: '++id'
        });
    }
};

export const db = new AppDb();