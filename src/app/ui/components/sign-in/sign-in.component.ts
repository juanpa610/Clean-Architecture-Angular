import { Component } from '@angular/core';
import { AuthService } from '../../../infraestructure/driven-adapters/auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private signInService: AuthService, private fb: FormBuilder) {
    this.initiateFrom();
  }

  initiateFrom() {
    this.signInForm = this.fb.group({
      userName: ['', Validators.required,],
      password: ['', Validators.required, Validators.minLength(8)],
    });
  }



  async onSubmit(): Promise<void> {
    if (this.signInForm.invalid) {

      this.isLoading = true;
      const loginData = this.signInForm.value;

      try {
        const user = await this.signInService.autoSignIn(loginData);
        console.log(user);

      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  }

}
