import { Injectable } from '@angular/core';
import { signUp, confirmSignUp, signIn, autoSignIn, getCurrentUser, fetchAuthSession, signOut, JWT } from 'aws-amplify/auth';


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
          nickname: userData.nickname,
          email: userData.email,
        },
        autoSignIn: true
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
  async signIn(userData: any) {
    try {
      const user = await signIn({
        username: userData.userName,
        password: userData.password
      });
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      throw error;
    }
  }
  async autoSignIn() {
    const respAutoSignIn = await autoSignIn();

    return respAutoSignIn;
  }
  async getCurrentUser() {
    const { username, userId, signInDetails } = await getCurrentUser();

    return { username, userId, signInDetails };
  }
  async getCurrentSession() {
    const response = await fetchAuthSession() ;

    const tokenJWT = response.tokens?.idToken as JWT;
    return tokenJWT;
  }
  async signOut() {
    try {
      sessionStorage.clear();
      await signOut();
    } catch (error) {
      console.error(error);
    }
  }

}
