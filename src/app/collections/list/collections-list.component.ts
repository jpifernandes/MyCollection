import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../../../services/collections.service';
import { CustomCollection } from '../../../models/custom-collection.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.css'
})
export class CollectionsListComponent implements OnInit {
  
  collections!: CustomCollection[];
  filteredCollections!: CustomCollection[];
  downloadCollectionsHref!: SafeUrl;

  constructor(private collectionsService: CollectionsService,
              private sanitizer: DomSanitizer
  ) {}
  
  ngOnInit(): void {
    
    this.collectionsService.getCollections().then(c => {
      
      this.collections = c;
      this.filteredCollections = c;

      this.generateCollectionsDownloadHref();
    });

  }

  onFilter(event: any) {
    const input = event.target.value;
    var regex = new RegExp(input, 'i');
    this.filteredCollections = this.collections.filter(c => regex.test(c.description));
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

  private generateCollectionsDownloadHref(): void{
    const collectionsToExport = { collections: this.collections };
    const json = JSON.stringify(collectionsToExport);

    this.downloadCollectionsHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
  }
}
