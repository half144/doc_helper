import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  login() {
    const { username, password } = this.loginForm.value;
    if (!username || !password) {
      return;
    }
    this.authService.login(username, password).subscribe();
  }
}
