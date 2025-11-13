import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Checkbox} from 'primeng/checkbox';
import {Router, RouterLink} from '@angular/router';
import {Password} from 'primeng/password';
import {InputText} from 'primeng/inputtext';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    Checkbox,
    RouterLink,
    Password,
    InputText
  ],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  signinForm = new FormGroup({
    loginEmail: new FormControl("", {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    loginPassword: new FormControl("", {
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(60)],
      nonNullable: true,
    }),
  });

  onSubmit() {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const loginData = {
      email: this.signinForm.value.loginEmail!,
      password: this.signinForm.value.loginPassword!,
    };

    this.authService.PostLogin(loginData).subscribe({
      next: (response) => {
        console.log('✅ Login success:', response);
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.error('ogin failed:', err.message());
        alert('Email or password is incorrect');
      },
    });
  }

}
