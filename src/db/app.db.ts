import Dexie, { Table } from 'dexie';
import { CustomCollection } from '../models/custom-collection.model';

export class AppDb extends Dexie {

    collections!: Table<CustomCollection, number>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(3).stores({
            collections: '++id'
        });
    }
};

export const db = new AppDb();