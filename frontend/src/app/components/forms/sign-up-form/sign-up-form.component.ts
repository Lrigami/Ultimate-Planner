import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn} from '@angular/forms';
import { Observable, of, map, catchError } from 'rxjs';
import { AuthService } from '../../../services/sign-in-up-service';
import { ButtonComponent } from '../../buttons/button.component';

@Component({
  selector: 'sign-up-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  userCreated = new EventEmitter<boolean>();
  isCapsLockOn = false;
  isFirstPasswordVisible = false;
  isSecondPasswordVisible = false;

  constructor(public authService: AuthService) {}

  emailFormControl!: FormControl<string>;
  passwordFormControl!: FormControl<string>;
  passwordConfirmationFormControl!: FormControl<string>;

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
  
      return this.authService.isEmailTaken(control.value).pipe(
        map(status => (status === 200 ? { existingEmail: true } : null)),
        catchError(() => of(null))
      );
    };
  }

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

  ngOnInit() {
    this.emailFormControl = new FormControl(
      '', 
      [Validators.required, Validators.email], 
      [this.emailValidator()] // Ajout du validateur asynchrone ici
    ) as FormControl<string>;

    this.passwordFormControl = new FormControl(
      '', 
      [Validators.required, this.passwordValidator(8)]
    ) as FormControl<string>;

    this.passwordConfirmationFormControl = new FormControl(
      '', 
      [Validators.required, this.passwordConfirmationValidator()]
    ) as FormControl<string>;
  }

  isInvalid(): boolean {
    return this.emailFormControl.invalid && (this.emailFormControl.dirty || this.emailFormControl.touched);
  }

  togglePasswordVisibility(password: string): void {
    password === 'first' ? this.isFirstPasswordVisible = !this.isFirstPasswordVisible : this.isSecondPasswordVisible = !this.isSecondPasswordVisible;
  }

  onKeyDown(event: KeyboardEvent): void {
    this.isCapsLockOn = event.getModifierState('CapsLock');
  }

  handleSignUp() {
    const newUser = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    };

    this.authService.createUser(newUser).subscribe({
      next: () => {
        this.userCreated.emit(true);
        window.scrollBy({ left: -window.innerWidth * 0.5, behavior: 'smooth' });
      },
      error: (error) => console.error("Create user failed: ", error)
    });
  }
}
