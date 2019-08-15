import { Routes } from "@angular/router";
import { ContactFormComponent } from "app/contact-form/contact-form.component";
import { ContactTableComponent } from "app/contact-table/contact-table.component";
import { WrapperComponent } from "app/wrapper.component";

export const HOME_ROUTES: Routes = [
    { path: '', component: WrapperComponent, children: [
            { path: '', component: ContactTableComponent }]
    },
    { path: 'contactTable', component: ContactTableComponent },
    { path: 'addContact', component: ContactFormComponent },
    { path: 'editContact/:id', component: ContactFormComponent },
    { path: 'searchContacts', component: ContactTableComponent }
]