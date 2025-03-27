import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/sign-in-up-service';
import { FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../components/buttons/button.component';

@Component({
  selector: 'forgot-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  isMailSent: boolean = false;

  constructor (public authService: AuthService) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]) as FormControl<string>;

  isInvalid(): boolean {
    return this.emailFormControl.invalid && (this.emailFormControl.dirty || this.emailFormControl.touched);
  }

  sendResetMail() {
    this.authService.forgotPassword(this.emailFormControl.value).subscribe({
        next: () => {
          this.isMailSent = true;
          this.emailFormControl.reset();
        }, 
        error: (err) => console.error("Mail error:", err) 
    });
}
}
