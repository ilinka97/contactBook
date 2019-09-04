import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "app/services/user.service";
import { UserCredentials } from "app/models/userCredentials";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "cb-register-login",
  templateUrl: "./register-login.component.html",
  styleUrls: ["./register-login.component.css"]
})
export class RegisterLoginComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;
  loginFailed: boolean = this.authenticationService.isLoggedIn();
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit() {
    this.initSignupForm();
    this.initLoginForm();
  }

  initSignupForm() {
    let userCredentials: UserCredentials = new UserCredentials("", "");
    let email: string = "";

    this.signupForm = this.formBuilder.group({
      userCredentials: this.formBuilder.group({
        username: [userCredentials.username, Validators.required],
        password: [userCredentials.password, Validators.required]
      }),
      email: [email, [Validators.required, Validators.email]]
    });
  }
  initLoginForm() {
    let credentials: UserCredentials = new UserCredentials("", "");

    this.loginForm = this.formBuilder.group({
      username: [credentials.username, Validators.required],
      password: [credentials.password, Validators.required]
    });
  }
  get username() { return this.loginForm.get("username"); }
  get password() { return this.loginForm.get("password"); }
  onSignup() {
    let formValue = this.signupForm.value;
    this.userService.signup(formValue).subscribe(
      () => {
        this.signupForm.reset();
    });
  }
  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let formValue = this.loginForm.value;
    this.authenticationService.login(formValue);
  }
}
