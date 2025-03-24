import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../components/buttons/button.component';
import { SignInFormComponent } from '../../components/forms/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '../../components/forms/sign-up-form/sign-up-form.component';

@Component({
  selector: 'sign-in',
  imports: [CommonModule, ButtonComponent, SignInFormComponent, SignUpFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  position: string = 'left';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.position = data['position'];
    });
  }

  goToSignUp() {
    window.scrollBy({ left: window.innerWidth * 0.5, behavior: 'smooth' });
  }

  goToSignIn() {
    window.scrollBy({ left: -window.innerWidth * 0.5, behavior: 'smooth' });
  }
}
