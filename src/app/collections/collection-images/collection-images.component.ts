import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageMetadata } from '../../../models/image-metadata.mode';

const MAX_IMAGES: number = 20; 

@Component({
  selector: 'app-collection-images',
  templateUrl: './collection-images.component.html',
  styleUrl: './collection-images.component.css'
})
export class CollectionImagesComponent implements OnInit {
  
  scrollDistance = 1;

  imagesMetadata: ImageMetadata[] = [];
  filteredImagesMetadata: ImageMetadata[] = [];

  @Input()
  set images(images: string[]) {
    for(let image of images)
      this.imagesMetadata.push(new ImageMetadata(image, false));

    this.filteredImagesMetadata = this.imagesMetadata.slice(0, MAX_IMAGES);
  }

  @Output() onSelectCollectionMainImage = new EventEmitter<any>();
  @Output() onSelectCollectionBanner = new EventEmitter<any>();

  ngOnInit(): void { }

  manageImageOptions(imageIndex: number): void {
    for(let i=0; i < this.imagesMetadata.length; i++){
      if(imageIndex != i)
        this.imagesMetadata[i].showOptions = false;
      else
        this.imagesMetadata[i].showOptions = !this.imagesMetadata[i].showOptions;
    }
  }

  setCollectionMainImage(imageIndex: number): void {
    const image = this.imagesMetadata[imageIndex].src;
    this.onSelectCollectionMainImage.emit(image);
  }

  setCollectionBanner(imageIndex: number): void {
    const image = this.imagesMetadata[imageIndex].src;
    this.onSelectCollectionBanner.emit(image);
  }

  onScrollDown(event: any) {
    const startIndex = this.filteredImagesMetadata.length;
    const endIndex = startIndex + MAX_IMAGES;

    this.filteredImagesMetadata.push(...this.imagesMetadata.slice(startIndex, endIndex));
  }

}
