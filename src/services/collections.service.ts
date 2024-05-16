import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { CustomCollection } from '../models/custom-collection.model';
import { firstValueFrom } from 'rxjs';
import { db } from '../db/app.db';
import { MyCollectionSettings } from '../models/my-collection-settings.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  settings: MyCollectionSettings;

  constructor(private settingsService: SettingsService,
              private http: HttpClient
  )
  {
    this.settings = settingsService.getSettings();
  }

  async getCollections(): Promise<CustomCollection[]> {
    
    const dbCollections = await this.getCollectionsFromDb();

    if(dbCollections.length > 0) return dbCollections;

    if(this.settings.virtualDirectoriesRelativePaths == null) return [];

    const htmls = new Array<string>();

    for(let virtualDirRelativePath of this.settings.virtualDirectoriesRelativePaths) {

      const dirPath = this.settings.virtualDirectoriesHost + virtualDirRelativePath;
      const dirHtml = await this.getHtml(dirPath);
      htmls.push(dirHtml);
    }

    const collections = this.extractCollections(htmls);

    await this.replaceCollections(collections);

    return collections;
  }

  async getCollection(id: string): Promise<CustomCollection | undefined> {

    const collection = await this.getCollectionFromDb(id);

    if(!collection) return;

    for(let dir of collection.directories){
      const links = await this.getMediaLinks(dir);
      
      for(let link of links) {
        if(this.isImage(link)) collection.images.push(link);
        else if(this.isVideo(link)) collection.videos.push(link);
      }
    }

    return collection;
  }

  async updateCollection(updatedCollection: CustomCollection): Promise<number> {
    return db.collections.where({ id: updatedCollection.id }).modify((c) => {
      c.collectionBanner = updatedCollection.collectionBanner;
      c.collectionPic = updatedCollection.collectionPic;
    });
  }

  async replaceCollections(updatedCollections: CustomCollection[]): Promise<number> {
    await db.collections.clear();
    return db.collections.bulkAdd(updatedCollections);
  }

  async refreshCollections(): Promise<CustomCollection[]> {
    
    const dbCollections = await this.getCollectionsFromDb();

    const htmls = new Array<string>();

    for(let virtualDirRelativePath of this.settings.virtualDirectoriesRelativePaths) {
      const dirPath = this.settings.virtualDirectoriesHost + virtualDirRelativePath;
      const dirHtml = await this.getHtml(dirPath);
      htmls.push(dirHtml);
    }

    let collections = this.extractCollections(htmls);

    for(let dbCollection of dbCollections){
      const collection = collections.find(c => c.id == dbCollection.id);

      if(collection) Object.assign(collection, dbCollection); //Keep state
      else collections = collections.filter(c => c.id != dbCollection.id); //Remove from state
    }

    await this.replaceCollections(collections);

    return collections;
  }

  private async getCollectionsFromDb(): Promise<CustomCollection[]> {
    const dbCollections = await db.collections.toArray();
    return dbCollections.filter(dc => new CustomCollection(dc.id, dc.description, dc.directories, dc.collectionPic, dc.collectionBanner));
  }

  private async getCollectionFromDb(id: string): Promise<CustomCollection | undefined> {
    const dbCollection = await db.collections.get({ id: id });

    if(!dbCollection) return;

    return new CustomCollection(dbCollection.id, dbCollection.description,
                                dbCollection.directories, dbCollection.collectionPic,
                                dbCollection.collectionBanner);
  }

  private extractCollections(htmls: string[]): CustomCollection[] {

    const completeHtml = htmls.join();
    let match;
    const hrefs = new Map<string, CustomCollection>();
    const linkRegex = this.getLinkRegex();

    while ((match = linkRegex.exec(completeHtml)) !== null) {

      const collectionPath = match[1];
      const collectionId = match[2];

      if(collectionPath == '/') continue;

      if(this.isDirectory(collectionPath)){

        if(hrefs.has(collectionId))
          hrefs.get(collectionId)?.directories.push(collectionPath);
        else
          hrefs.set(collectionId, new CustomCollection(collectionId, collectionId, [ collectionPath ]));
      }
    }

    return [...hrefs.values()];
  }

  private async getMediaLinks(directory: string): Promise<string[]> {
    
    const links = new Array<string>();

    const dirPath = this.settings.virtualDirectoriesHost + directory;
    const dirHtml = await this.getHtml(dirPath);

    const extractedLinks = this.extractLinks(dirHtml);

    for(let extractedLink of extractedLinks) {
      if(this.isDirectory(extractedLink)){
        const subDirLinks = await this.getMediaLinks(extractedLink);
        links.push(...subDirLinks);
      } else {
        links.push(this.settings.virtualDirectoriesHost + extractedLink);
      }
    }

    return links;
  }

  private extractLinks(html: string): string[] {
    
    let match;
    const links = new Array<string>();
    const linkRegex = this.getLinkRegex();
    let count = 0;

    while ((match = linkRegex.exec(html)) !== null) {
      count++;

      if(count == 1) continue;

      links.push(match[1]);
    }

    return links;
  }

  private isDirectory(link: string): boolean {
    return link.endsWith("/");
  }

  private isImage(link: string): boolean {
    const imageExtensionRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    return imageExtensionRegex.test(link);
  }

  private isVideo(link: string): boolean {
    const videoExtensionRegex = /\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|m4v|svi|3gpp|3gpp2|mxf|roq|nsv|flv|f4v|f4p|f4a|f4b)$/i;
    return videoExtensionRegex.test(link);
  }

  private getLinkRegex(): RegExp {
    return /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
  }

  private getHtml(url: string): Promise<string> {
    return firstValueFrom(this.http.get(url, { responseType: 'text' }));
  }
}
