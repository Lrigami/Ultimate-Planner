import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
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

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

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
