import { Injectable } from '@angular/core';
import { MyCollectionSettings } from '../models/my-collection-settings.model';
import { db } from '../db/app.db';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  async getSettings(): Promise<MyCollectionSettings> {
    const settings = new MyCollectionSettings("", []);
    const dbSettings = await db.settings.get(1);

    if(dbSettings)
      Object.assign(settings, dbSettings);

    return settings;
  }

  async updateSettings(updatedSettings: MyCollectionSettings): Promise<number> {
    await db.settings.clear();
    return db.settings.add(updatedSettings);
  }
}
