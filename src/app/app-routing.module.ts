import { RouterModule, Routes } from "@angular/router";
import { CollectionsRoutes } from "./collections/collections-routing.module";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'collections',
        pathMatch: 'full'
    },
    ...CollectionsRoutes
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{}