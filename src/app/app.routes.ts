import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EmergencyPageComponent } from './emergency-page/emergency-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AddUserPageComponent } from './add-user-page/add-user-page.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';

export const routes: Routes = [
    {path: "" , component: HomePageComponent},
    {path : "emergency" , component: EmergencyPageComponent},
    {path: "emergency/:building", component: EmergencyPageComponent},
    {path: "add-user", component: AddUserPageComponent},
    {path: "edit-building", component: EditBuildingComponent},
    {path: "**" , component: NotFoundPageComponent} 
];
