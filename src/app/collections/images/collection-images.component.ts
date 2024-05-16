import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageMetadata } from '../../../models/image-metadata.mode';

@Component({
  selector: 'app-collection-images',
  templateUrl: './collection-images.component.html',
  styleUrl: './collection-images.component.css'
})
export class CollectionImagesComponent implements OnInit {

  allImages: ImageMetadata[] = [];

  @Input()
  get images() {
    return this.allImages;
  }

  set images(allImages: ImageMetadata[]) {
    this.allImages = allImages;
  }

  @Output() onSelectCollectionMainImage = new EventEmitter<any>();
  @Output() onSelectCollectionBanner = new EventEmitter<any>();

  ngOnInit(): void { }

  manageImageOptions(imageIndex: number): void {
    for(let i=0; i < this.allImages.length; i++){
      if(imageIndex != i)
        this.allImages[i].showOptions = false;
      else
        this.allImages[i].showOptions = !this.allImages[i].showOptions;
    }
  }

  setCollectionMainImage(imageIndex: number): void {
    const image = this.allImages[imageIndex].src;
    this.onSelectCollectionMainImage.emit(image);
    this.allImages[imageIndex].showOptions = false;
  }

  setCollectionBanner(imageIndex: number): void {
    const image = this.allImages[imageIndex].src;
    this.onSelectCollectionBanner.emit(image);
    this.allImages[imageIndex].showOptions = false;
  }

}
