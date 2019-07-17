import { Routes, RouterModule } from "@angular/router";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { HOME_ROUTES } from "./home.routes";
import { HomeComponent } from "./home.component";
import { ContactTableComponent } from "./contact-table/contact-table.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, children: HOME_ROUTES },
    { path: 'addContact', component: ContactFormComponent },
    { path: 'editContact/:id', component: ContactFormComponent },
    { path: 'searchContacts', component: ContactTableComponent }
];
export const ROUTING = RouterModule.forRoot(APP_ROUTES);