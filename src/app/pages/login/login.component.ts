import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  hide = true;
  errorMessage: string = '';

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', { validators: [Validators.required,Validators.email] }),
      password: this.fb.control('', { validators: [Validators.required] }),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({        
        next: (res) => {
          console.log('Login successful', res);
          const token = (res as any).token;
          localStorage.setItem('jwt', token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log('Login failed!');
          this.errorMessage = 'Invalid Credentials';
        }
      });
    }
  }

}
