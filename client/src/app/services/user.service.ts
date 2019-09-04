import { Injectable } from "@angular/core";
import { User } from "app/models/user";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserCredentials } from "app/models/userCredentials";

@Injectable({
  providedIn: "root"
})
export class UserService {
  usersUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  signup(user: User): Observable<User> {
    return this.httpClient.post<User>(this.usersUrl + '/users/register', user);
  }
  login(credentials: UserCredentials) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.httpClient.post(this.usersUrl + '/login', credentials, httpOptions);
  }
  public logout() {
    return this.httpClient.post(this.usersUrl + '/logout', {responseType: 'text'});
  }
}
