import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "cb-register-login",
  templateUrl: "./register-login.component.html",
  styleUrls: ["./register-login.component.css"]
})
export class RegisterLoginComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.initSignupForm();
    this.initLoginForm();
  }

  initSignupForm() {
    let username: string = "";
    let email: string = "";
    let password: string = "";

    this.signupForm = this.formBuilder.group({
      username: [username, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      password: [password, Validators.required]
    });
  }
  initLoginForm() {
    let username: string = "";
    let password: string = "";

    this.loginForm = this.formBuilder.group({
      username: [username, Validators.required],
      password: [password, Validators.required]
    });
  }
  onSignup() {
    let formValue = this.signupForm.value;
    this.authenticationService.signup(formValue).subscribe(() => {
      this.signupForm.reset();
    });
  }
  onLogin() {}
}
