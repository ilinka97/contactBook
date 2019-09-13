import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "./user.service";

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function ValidateUsername(userService: UserService) {
  return (control: FormControl) =>
    new Promise((resolve, reject) => {
      userService.getUserByUsername(control.value).subscribe(
        (data: boolean) => {
          if (!data) {
            resolve({ usernameTaken: true });
          } else {
            resolve(null);
          }
        },
        err => {
          resolve({ usernameTaken: true });
        }
      );
    });
}
