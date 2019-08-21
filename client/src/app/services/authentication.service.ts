import { Injectable } from "@angular/core";
import { User } from "app/models/user";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  usersUrl = '/api/users';

  constructor(private httpClient: HttpClient) {}

  signup(user: User): Observable<User> {
    return this.httpClient.post<User>(this.usersUrl + "/register", user);
  }
}
