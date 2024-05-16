import { Component, OnInit } from '@angular/core';
import { CustomCollection } from '../../../models/custom-collection.model';
import { CollectionsService } from '../../../services/collections.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageMetadata } from '../../../models/image-metadata.mode';

const MAX_IMAGES: number = 20;
const MAX_VIDEOS: number = 4;

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.css'
})
export class CollectionDetailsComponent implements OnInit {
  
  collection: CustomCollection;
  currentTab: string = 'images';
  filteredImages: ImageMetadata[] = [];
  filteredVideos: string[] = [];

  constructor(private collectiosService: CollectionsService,
              private route: ActivatedRoute,
              private router: Router
  )
  {
    this.collection = new CustomCollection("", "", []);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    this.collectiosService.getCollection(id)
      .then(c => {
        
        if(c){
          this.collection = c;

          for(let image of this.collection.images.slice(0, MAX_IMAGES))
            this.filteredImages.push(new ImageMetadata(image, false));

          this.filteredVideos = this.collection.videos.slice(0, MAX_VIDEOS);
        } 
        else {
          this.router.navigate(['/collections']);
        }

      });
  }

  async onSelectCollectionMainImage(image: string): Promise<void> {
    this.collection.collectionPic = image;
    await this.collectiosService.updateCollection(this.collection);
  }

  async onSelectCollectionBanner(image: string): Promise<void> {
    this.collection.collectionBanner = image;
    await this.collectiosService.updateCollection(this.collection);
  }

  changeTabState(currentTab: string) {
    this.currentTab = currentTab;
  }

  onScrollDown(eventType: any): void {
    if(this.currentTab == 'images'){
      this.loadImages();
    }
    else {
      this.loadVideos();
    } 
  }

  private loadImages() {
    const startIndex = this.filteredImages.length;
    const endIndex = startIndex + MAX_IMAGES;

    if(startIndex >= this.collection.images.length) return;

    for(let image of this.collection.images.slice(startIndex, endIndex))
      this.filteredImages.push(new ImageMetadata(image, false));
  }

  private loadVideos() {
    const startIndex = this.filteredVideos.length;
    const endIndex = startIndex + MAX_VIDEOS;

    if(startIndex >= this.collection.videos.length) return;

    this.filteredVideos.push(...this.collection.videos.slice(startIndex, endIndex));
  }
}
