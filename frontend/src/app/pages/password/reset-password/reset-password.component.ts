import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { AuthService } from '../../../services/sign-in-up-service';
import { ButtonComponent } from '../../../components/buttons/button.component';

@Component({
  selector: 'reset-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  isPasswordReset: boolean = false;
  isCapsLockOn = false;
  isFirstPasswordVisible = false;
  isSecondPasswordVisible = false;

  constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService) {}

  resetPasswordFormControl!: FormControl<string>;
  resetPasswordConfirmationFormControl!: FormControl<string>;

  passwordValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      
      if (password && password.length < minLength) {
        return { 'passwordTooShort': true };
      }
  
      if (password && !/[A-Z]/.test(password)) {
        return { 'missingUppercase': true };
      }
  
      if (password && !/\d/.test(password)) {
        return { 'missingNumber': true };
      }
  
      if (password && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return { 'missingSpecialChar': true };
      }
  
      return null;
    };
  }

  passwordConfirmationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      if (password !== this.resetPasswordFormControl.value) {
        return { 'nonMatchingPassword': true};
      }

      return null;
    };
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.resetPasswordFormControl = new FormControl(
      '', 
      [Validators.required, this.passwordValidator(8)]
    ) as FormControl<string>;

    this.resetPasswordConfirmationFormControl = new FormControl(
      '', 
      [Validators.required, this.passwordConfirmationValidator()]
    ) as FormControl<string>;
  }

  togglePasswordVisibility(password: string): void {
    password === 'first' ? this.isFirstPasswordVisible = !this.isFirstPasswordVisible : this.isSecondPasswordVisible = !this.isSecondPasswordVisible;
  }

  onKeyDown(event: KeyboardEvent): void {
    this.isCapsLockOn = event.getModifierState('CapsLock');
  }

  reset() {
    const newPassword = this.resetPasswordFormControl.value;
    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.isPasswordReset = true;
        this.router.navigate(['/auth']);
      },
      error: (err) => console.error('Reset password error: ', err)
    });
  }
}
