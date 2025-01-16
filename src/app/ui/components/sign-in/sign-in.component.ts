import { Component } from '@angular/core';
import { AuthService } from '../../../infraestructure/driven-adapters/auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  signInForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private signInService: AuthService, private fb: FormBuilder, private route: Router) {
    this.initiateFrom();
  }

  initiateFrom() {
    this.signInForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.signInForm.valid) {

      // this.isLoading = true;
      const loginData = this.signInForm.value;

      try {
        const user = await this.signInService.signIn(loginData);
        if (user.isSignedIn) {
          this.isLoading = false;
          this.route.navigate(['list-albums']);
          this.setDataAutoSignIn();
        }

      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async setDataAutoSignIn() {
    const idToken = await this.signInService.getCurrentSession();
    sessionStorage.setItem('current_session_token', idToken.toString());

    let { username, userId } = await this.signInService.getCurrentUser();
    sessionStorage.setItem('current_user_id', userId.toString());
    sessionStorage.setItem('current_user_name', username.toString());
    
    alert('Logueado exitosamente.');

  }

}