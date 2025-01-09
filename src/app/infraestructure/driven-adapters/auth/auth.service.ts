import { Injectable } from '@angular/core';
import { signUp, confirmSignUp, autoSignIn, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  async signUp(userData: any) {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: userData.email,
      password: userData.password,
      options: {
        userAttributes: {
          nickname: userData.name,
          email: userData.email,
        },
        autoSignIn: true,
      }
    });

    return nextStep;
  }

  async confirmSignUp(userDataToConfirm: any) {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: userDataToConfirm.username,
      confirmationCode: userDataToConfirm.confirmationCode
    });

    console.log('next Step CONFRIM sign up', isSignUpComplete, nextStep);

    return nextStep;
  }

  async autoSignIn() {
    const respAutoSignIn = await autoSignIn();

    return respAutoSignIn;
  }

  async getCurrentUser() {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log('next Step getCurrent USER', { username }, { userId }, { signInDetails });
  }

  async getCurrentSession() {
    console.log('naaaaaaaaaaaaaaaaaaa');
    const nextStep = await fetchAuthSession();
    console.log('next Step getCurrent SESSION', nextStep);
  }

  async setSessionData() {
    const currentSession = await this.getCurrentSession();
    console.log('currentSession', currentSession);
    // sessionStorage.setItem('session_token', 'true');
  }

}
