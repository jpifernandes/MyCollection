import { Component, OnInit } from '@angular/core';
import { CustomCollection } from '../../../models/custom-collection.model';
import { CollectionsService } from '../../../services/collections.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.css'
})
export class CollectionDetailsComponent implements OnInit {
  
  collection!: CustomCollection | undefined;

  constructor(private collectiosService: CollectionsService,
              private route: ActivatedRoute,
              private router: Router
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    this.collectiosService.getCollection(id)
      .then(c => {
        if(c) this.collection = c
        else this.router.navigate(['/collections']);
      });
  }
}
