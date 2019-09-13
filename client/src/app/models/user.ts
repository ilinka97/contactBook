import { UserCredentials } from "./userCredentials";

export class User {
  constructor(public userId: string, public userCredentials: UserCredentials, public email: string) {}
}
