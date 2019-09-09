import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "app/services/user.service";
import { UserCredentials } from "app/models/userCredentials";
import { AuthenticationService } from "app/services/authentication.service";
import { MustMatch } from "app/services/match.validator";

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
  regSubmitted: boolean;
  isSignedup: boolean;

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
    let confirmPassword = "";

    this.signupForm = this.formBuilder.group({
        userCredentials: this.formBuilder.group({
          username: [userCredentials.username,[Validators.required, Validators.minLength(6)]],
          password: [userCredentials.password,[Validators.required, Validators.minLength(8)]]
        }),
        email: [email, [Validators.required, Validators.email]],
        confirmPassword: [confirmPassword, Validators.required]
      },{
        validator: MustMatch("userCredentials.password", "confirmPassword")
      }
    );
  }
  get regUsername() { return this.signupForm.get("userCredentials.username"); }
  get regPassword() { return this.signupForm.get("userCredentials.password"); }
  get regConfirmPass() { return this.signupForm.get("confirmPassword"); }
  get regEmail() { return this.signupForm.get("email"); }
  onSignup() {
    this.regSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    let formValue = this.signupForm.value;
    delete formValue["confirmPassword"];
    this.userService.signup(formValue).subscribe(() => {
      this.signupForm.reset();
      this.regSubmitted = false;
      this.isSignedup = true;
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
  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let formValue = this.loginForm.value;
    this.authenticationService.login(formValue);
  }
}
