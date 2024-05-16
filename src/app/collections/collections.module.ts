import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { CollectionsListComponent } from './list/collections-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CollectionsService } from '../../services/collections.service';
import { RouterModule } from '@angular/router';
import { CollectionDetailsComponent } from './details/collection-details.component';
import { CollectionImagesComponent } from './images/collection-images.component';
import { CollectionVideosComponent } from './videos/collection-videos.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CollectionsImportComponent } from './import/collections-import.component';
import { CollectionsSettingsComponent } from './settings/collections-settings.component';

@NgModule({
  declarations: [
    CollectionsListComponent,
    CollectionDetailsComponent,
    CollectionImagesComponent,
    CollectionVideosComponent,
    CollectionsImportComponent,
    CollectionsSettingsComponent
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
