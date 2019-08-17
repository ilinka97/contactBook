import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CoverComponent } from './cover/cover.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactTableComponent } from './contact-table/contact-table.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ROUTING } from './app.routing';
import { ContactService } from './services/contact.service';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { HomeComponent } from './home/home.component';
import { WrapperComponent } from './wrapper.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CoverComponent,
    NavbarComponent,
    ContactTableComponent,
    ContactFormComponent,
    HomeComponent,
    RegisterLoginComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ROUTING
  ],
  providers: [ContactService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
