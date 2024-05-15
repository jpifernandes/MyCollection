import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { CollectionsListComponent } from './list/collections-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CollectionsService } from '../../services/collections.service';
import { RouterModule } from '@angular/router';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';

@NgModule({
  declarations: [
    CollectionsListComponent,
    CollectionDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    SettingsService,
    CollectionsService
  ]
})
export class CollectionsModule { }
