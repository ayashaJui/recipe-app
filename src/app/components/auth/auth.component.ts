import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  // styleUrls: ['./shopping-edit.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | undefined 


  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
    } else {
      this.authService.signup(email, password).subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false
        },
        (error) => {
          this.error = 'An error occurred'
          this.isLoading = false
        }
      );
    }

    form.reset();
  }
}