import { Injectable } from '@angular/core';
import { MyCollectionSettings } from '../models/my-collection-settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getSettings(): MyCollectionSettings {
    return new MyCollectionSettings(
      "http://localhost",
      [
        "/Collection1/",
        "/Collection2/"
      ],
      "profile",
      "banner");
  }
}
