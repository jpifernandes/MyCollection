import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { CustomCollection } from '../models/custom-collection.model';
import { firstValueFrom } from 'rxjs';
import { db } from '../db/app.db';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private settingsService: SettingsService,
              private http: HttpClient
  ) { }

  async getCollections(): Promise<CustomCollection[]> {
    
    const dbCollections = await this.getCollectionsFromDb();

    if(dbCollections.length > 0) return dbCollections;

    const settings = this.settingsService.getSettings();

    if(settings.virtualDirectoriesRelativePaths == null) return [];

    const htmls = new Array<string>();

    for(let virtualDirRelativePath of settings.virtualDirectoriesRelativePaths) {

      const dirPath = settings.virtualDirectoriesHost + virtualDirRelativePath;
      const dirHtml = await firstValueFrom(this.http.get(dirPath, { responseType: 'text' }));
      htmls.push(dirHtml);
    }

    const collections = this.extractCollections(htmls);

    await this.setCollectionsInDb(collections);

    return collections;
  }

  getCollection(id: string): Promise<CustomCollection | undefined> {
    return db.collections.get({ id: id });
  }

  private getCollectionsFromDb(): Promise<CustomCollection[]> {
    return db.collections.toArray();
  }

  private setCollectionsInDb(collections: CustomCollection[]): Promise<number> {
    return db.collections.bulkAdd(collections);
  }

  private extractCollections(htmls: string[]): CustomCollection[] {

    const completeHtml = htmls.join();
    const regex = /<a\s+(?:[^>]*?\s+)?href="([^"\.]*)"[^>]*>(.*?)<\/a>/gi;
    let match;
    const hrefs = new Map<string, CustomCollection>();

    while ((match = regex.exec(completeHtml)) !== null) {
      if(match[1] == '/') continue;

      hrefs.set(match[2], new CustomCollection(match[2], match[2], match[1]));
    }

    return [...hrefs.values()];
  }
}
