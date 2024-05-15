import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { CollectionsListComponent } from './list/collections-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CollectionsService } from '../../services/collections.service';
import { RouterModule } from '@angular/router';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';
import { CollectionImagesComponent } from './collection-images/collection-images.component';
import { CollectionVideosComponent } from './collection-videos/collection-videos.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    CollectionsListComponent,
    CollectionDetailsComponent,
    CollectionImagesComponent,
    CollectionVideosComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule
  ],
  providers: [
    SettingsService,
    CollectionsService
  ]
})
export class CollectionsModule { }
