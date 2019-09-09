import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/services/authentication.service";
import { UserService } from "app/services/user.service";

@Component({
  selector: "cb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  userName: String = "";

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {}
  ngOnInit() {
    this.setCurrentUsername();
  }
  setCurrentUsername() {
    this.userService.getCurrentUsername().subscribe(
      (username: any) => {
      this.userName = username;
    });
  }
  onLogout() {
    this.authenticationService.logout();
  }
}
