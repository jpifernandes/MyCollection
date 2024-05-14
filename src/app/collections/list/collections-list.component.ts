import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../../../services/collections.service';
import { CustomCollection } from '../../../models/custom-collection.model';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.css'
})
export class CollectionsListComponent implements OnInit {
  
  collections!: CustomCollection[];

  constructor(private collectionsService: CollectionsService
  ) {}
  
  ngOnInit(): void {
    this.collectionsService.getCollections().then(c => {
      this.collections = c;
    });
  }

}
