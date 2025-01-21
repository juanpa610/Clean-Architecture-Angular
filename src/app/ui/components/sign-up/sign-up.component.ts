import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../infraestructure/driven-adapters/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signUpForm!: FormGroup;
  flagIsComfirmSignUp = false;

  code: FormControl = new FormControl('', [Validators.required]);

  constructor(private signUpService: AuthService, private fb: FormBuilder, private route: Router) {
    this.initiateFrom();
  }

  initiateFrom() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.registerUser();
    }
  }

  onSubmitComfirmCode() {
    if (this.code.valid) {
      this.confirmSignUp();
    }
  }

  async registerUser() {
    const userDataToRegistration = {
      username: this.signUpForm.value.email,
      nickname: this.signUpForm.value.userName,
      password: this.signUpForm.value.password,
      email: this.signUpForm.value.email,
    }

    const response = await this.signUpService.signUp(userDataToRegistration);

    if (response?.signUpStep === "CONFIRM_SIGN_UP") this.flagIsComfirmSignUp = true;
  }

  async confirmSignUp() {
    const userDataToConfirm = {
      username: this.signUpForm.value.email,
      confirmationCode: this.code.value
    }

    const response = await this.signUpService.confirmSignUp(userDataToConfirm);

    if (response.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
      const nextStep = await this.signUpService.autoSignIn();

      if (nextStep.isSignedIn) {
        this.setDataAutoSignIn();
      }
    }
  }
  async setDataAutoSignIn() {
    const idToken = await this.signUpService.getCurrentSession();
    sessionStorage.setItem('current_session_token', idToken.toString());
    this.signUpForm.reset();
    this.code.reset();
    alert('Registrado exitosamente.');
    this.route.navigate(['list-albums']);
    let { username, userId } = await this.signUpService.getCurrentUser();
    sessionStorage.setItem('current_user_id', userId.toString());
    sessionStorage.setItem('current_user_name', username.toString());

  }

}
