import { Routes } from "@angular/router";
import { CollectionsListComponent } from "./list/collections-list.component";
import { CollectionDetailsComponent } from "./collection-details/collection-details.component";

export const CollectionsRoutes: Routes = [
    {
        path: "collections",
        redirectTo: "collections/list"
    },
    {
        path: "collections/list",
        component: CollectionsListComponent
    },
    {
        path: "collections/details/:id",
        component: CollectionDetailsComponent
    }
];