import { Injectable } from '@angular/core';
import { signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  async signUp(userData: any) {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: userData.username,
      password: userData.password,
      options: {
        userAttributes: {
          nickname: userData.username,
          email: userData.email,
        }
      }
    });

    return nextStep;
  }

  async confirmSignUp(userDataToConfirm: any) {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: userDataToConfirm.username,
      confirmationCode: userDataToConfirm.confirmationCode
    });

    return nextStep;
  }
}
