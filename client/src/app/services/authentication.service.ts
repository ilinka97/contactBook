import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { UserCredentials } from "app/models/userCredentials";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  static readonly TOKEN_STORAGE_KEY = "token";

  constructor(private userService: UserService, private router: Router) {}

  public login(credentials: UserCredentials): void {
    this.userService.login(credentials).subscribe(
      (response: HttpResponse<any>) => {
        this.saveToken(response.headers.get("authorization"));
        this.router.navigate(["/home"]);
      });
  }
  private saveToken(token: string) {
    localStorage.setItem(AuthenticationService.TOKEN_STORAGE_KEY, token);
  }
  public getToken(): string {
    return localStorage.getItem(AuthenticationService.TOKEN_STORAGE_KEY);
  }
  public logout(): void {
    this.userService.logout().subscribe(
      () =>{
        localStorage.removeItem(AuthenticationService.TOKEN_STORAGE_KEY);
        this.router.navigate(["/"]);
    });
  }
  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
