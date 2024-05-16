import { EventEmitter, Component, ElementRef, Output, ViewChild } from '@angular/core';
import { CustomCollection } from '../../../models/custom-collection.model';

@Component({
  selector: 'app-collections-import',
  templateUrl: './collections-import.component.html',
  styleUrl: './collections-import.component.css'
})
export class CollectionsImportComponent {

  @ViewChild('collectionsJson') collectionsJson!: ElementRef;
  @Output() onImportCollections = new EventEmitter<CustomCollection[]>();

  importCollections(): void {
    const json = this.collectionsJson.nativeElement.value;

    if(!json || json.length <= 0) return;

    const parsedJson = JSON.parse(json);
    const collections = new Array<CustomCollection>();

    for(let parsedCollection of parsedJson.collections) {
      const collection = new CustomCollection("", "", []);
      Object.assign(collection, parsedCollection);
      collections.push(collection);
    }

    this.onImportCollections.emit(collections);
  }
}
