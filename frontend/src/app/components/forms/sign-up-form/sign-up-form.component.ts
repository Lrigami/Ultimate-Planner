import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'sign-up-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  isCapsLockOn = false;
  isFirstPasswordVisible = false;
  isSecondPasswordVisible = false;

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

      if (password !== this.passwordFormControl.value) {
        return { 'nonMatchingPassword': true};
      }

      return null;
    };
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, this.passwordValidator(8)]);
  passwordConfirmationFormControl = new FormControl('', [Validators.required, this.passwordConfirmationValidator()]);

  isInvalid(): boolean {
    return this.emailFormControl.invalid && (this.emailFormControl.dirty || this.emailFormControl.touched);
  }

  togglePasswordVisibility(password: string): void {
    password === 'first' ? this.isFirstPasswordVisible = !this.isFirstPasswordVisible : this.isSecondPasswordVisible = !this.isSecondPasswordVisible;
  }

  onKeyDown(event: KeyboardEvent): void {
    this.isCapsLockOn = event.getModifierState('CapsLock');
  }
}
