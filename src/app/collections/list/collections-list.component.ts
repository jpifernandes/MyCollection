import { Component, HostListener, OnInit } from '@angular/core';
import { CollectionsService } from '../../../services/collections.service';
import { CustomCollection } from '../../../models/custom-collection.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

const MAX_COLLECTIONS: number = 24;

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.css'
})
export class CollectionsListComponent implements OnInit {
  
  collections: CustomCollection[] = [];
  filteredCollections: CustomCollection[] = [];
  downloadCollectionsHref!: SafeUrl;
  filterInput: string = '';

  constructor(private collectionsService: CollectionsService,
              private sanitizer: DomSanitizer
  ) {}
  
  ngOnInit(): void {
    
    this.collectionsService.getCollections().then(c => {
      this.collections = c;

      for(let collection of this.collections.slice(0, MAX_COLLECTIONS))
        this.filteredCollections.push(collection);

      this.generateCollectionsDownloadHref();
    });

  }

  onFilter(event: any) {
    this.filterInput = event.target.value;
    this.filteredCollections = this.filterCollections(this.collections);
  }

  async onImportCollections(importedCollections: CustomCollection[]): Promise<void> {
    
    for(let importedCollection of importedCollections){ 
      const existentCollection = this.collections.find(c => c.id == importedCollection.id);

      if(existentCollection)
        Object.assign(existentCollection, importedCollection);
      else
        this.collections.push(importedCollection);
    }

    this.generateCollectionsDownloadHref();
    
    await this.collectionsService.replaceCollections(this.collections);
  }

  async refreshCollections(): Promise<void> {
    this.collections = await this.collectionsService.refreshCollections();
    this.filteredCollections = this.collections;
  }

  @HostListener('window:keydown', ['$event'])
  async onHardRefreshEvent(event: KeyboardEvent): Promise<void> {
    if(event.key == 'r' || event.key == 'R')
      await this.refreshCollections();
  }

  onScrollDown(eventType: any) {
    const startIndex = this.filteredCollections.length;
    const endIndex = startIndex + MAX_COLLECTIONS;

    if(startIndex >= this.collections.length) return;

    for(let collection of this.collections.slice(startIndex, endIndex))
      this.filteredCollections.push(collection);

    this.filteredCollections = this.filterCollections(this.filteredCollections);
  }

  private generateCollectionsDownloadHref(): void{
    const collectionsToExport = { collections: this.collections };
    const json = JSON.stringify(collectionsToExport);

    this.downloadCollectionsHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
  }

  private filterCollections(collectionsToFilter: CustomCollection[]): CustomCollection[] {
    if(!this.filterInput) return collectionsToFilter;

    var regex = new RegExp(this.filterInput, 'i');
    return collectionsToFilter.filter(c => regex.test(c.description));
  }
}
