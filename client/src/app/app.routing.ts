import { Routes, RouterModule } from "@angular/router";
import { RegisterLoginComponent } from "./register-login/register-login.component";
import { HOME_ROUTES } from "./home/home.routes";
import { HomeComponent } from "./home/home.component";

const APP_ROUTES: Routes = [
    { path: '', component: RegisterLoginComponent },
    { path: 'home', component: HomeComponent, children: HOME_ROUTES, canActivate: [] },
    { path: '**', redirectTo: '' }
];
export const ROUTING = RouterModule.forRoot(APP_ROUTES);