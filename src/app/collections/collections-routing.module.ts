import { Routes } from "@angular/router";
import { CollectionsListComponent } from "./list/collections-list.component";
import { CollectionDetailsComponent } from "./details/collection-details.component";

export const CollectionsRoutes: Routes = [
    {
        path: 'collections',
        component: CollectionsListComponent
    },
    {
        path: 'collections/details/:id',
        component: CollectionDetailsComponent
    }
];