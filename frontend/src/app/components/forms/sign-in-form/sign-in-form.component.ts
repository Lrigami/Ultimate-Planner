import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, Form} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/sign-in-up-service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'sign-in-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  isCapsLockOn = false;
  isPasswordVisible = false;
  errorMessage: string | null = null;

  constructor (public authService: AuthService, private router: Router) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]) as FormControl<string>;
  passwordFormControl = new FormControl('', [Validators.required]) as FormControl<string>;

  // Check if written email is valid
  isInvalid(): boolean {
    return this.emailFormControl.invalid && (this.emailFormControl.dirty || this.emailFormControl.touched);
  }

  // toggle Password Visibility 
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // When caps lock is on, it alerts the user
  onKeyDown(event: KeyboardEvent): void {
    this.isCapsLockOn = event.getModifierState('CapsLock');
  }

  // login the user if everything's right
  login() {
    this.authService.login(this.emailFormControl.value, this.passwordFormControl.value).subscribe({
      next: (response) => {
        if (response.token) {
          this.emailFormControl.reset();
          this.passwordFormControl.reset();
          this.router.navigate(['/todolist']);
        } else {
          this.errorMessage = 'Incorrect password or email';
        }
      },
      error: (error) => console.error({message: error})
    });
  }

  // navigate to the forgot password page
  goToForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }
}