import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "cb-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  userName: string = sessionStorage.getItem("username");

  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit() {}

  onLogout() {
    this.authenticationService.logout();
  }
}
