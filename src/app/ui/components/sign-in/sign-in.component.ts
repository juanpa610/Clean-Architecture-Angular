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

  constructor(private signInService: AuthService, private fb: FormBuilder) { }

  initiateFrom() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      userName: ['', Validators.required, ],
      password : ['', Validators.required, Validators.minLength(8)],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      // this.signInService.signIn(this.signInForm.value);
    } else {
      throw new Error('Method not implemented.');
    }
  }

}
