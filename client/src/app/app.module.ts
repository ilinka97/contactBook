import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { CoverComponent } from "./cover/cover.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ContactTableComponent } from "./contact-table/contact-table.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ROUTING } from "./app.routing";
import { RegisterLoginComponent } from "./register-login/register-login.component";
import { HomeComponent } from "./home/home.component";
import { WrapperComponent } from "./wrapper.component";
import { JwtTokenInterceptor } from "./interceptors/jwt.token.interceptor";

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}
