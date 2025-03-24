import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/buttons/button.component';
import { SignInFormComponent } from '../../components/forms/sign-in-form/sign-in-form.component';

@Component({
  selector: 'sign-in',
  imports: [ButtonComponent, SignInFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
