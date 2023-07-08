import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  error = signal('');
  stayConnected = signal(false);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginForm.invalid) return this.loginForm.markAllAsTouched();
    const { username, password } = this.loginForm.value;
    if (!username || !password) {
      return;
    }
    this.authService
      .login(username, password, this.stayConnected())
      .pipe(
        catchError((err) => {
          console.log(err);
          this.error.set(err);
          return err;
        })
      )
      .subscribe();
  }

  handleStayConnectedChange(event: any) {
    this.stayConnected.set(event);
  }
}
