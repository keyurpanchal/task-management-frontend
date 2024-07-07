import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers: [
  ]
})
export class RegistrationComponent {

  regForm!: FormGroup;
  private fb =  inject(FormBuilder);
  private authService =  inject(AuthService);
  private router =  inject(Router);
  hide = true;
  errorMessage: string = '';


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.regForm = this.fb.group({
      name: this.fb.control('', { validators: [Validators.required] }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      password: this.fb.control('', { validators: [Validators.required] }),
      phone: this.fb.control('', { validators: [Validators.required] }),
      city: this.fb.control('', { validators: [Validators.required] }),
    });
  }

  register() {
    if (this.regForm.valid) {
      this.authService.register(this.regForm.value).subscribe({
        next: (res) => {
          console.log('Registration successful!');
          console.log(res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Registration failed!');
          this.errorMessage = err.message || 'Registration failed!';
        }
      });
    }
  }

}
