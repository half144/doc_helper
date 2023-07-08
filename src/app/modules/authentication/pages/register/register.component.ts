import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  error = signal('');

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
    ],
    fullname: ['', [Validators.required, Validators.minLength(10)]],
  });

  getErrors(field: string) {
    const control = this.registerForm.get(field);

    if (control?.hasError('required')) {
      return 'Por favor, preencha este campo.';
    }

    if (control?.hasError('minlength')) {
      const requiredLength = control?.getError('minlength').requiredLength;
      return `O campo deve ter no mínimo ${requiredLength} caracteres.`;
    }

    return '';
  }

  handleRegister() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) return this.registerForm.markAllAsTouched();
    this.register();
  }

  register() {
    const { username, password, fullname } = this.registerForm.value;
    this.authService
      .register(username!, password!, fullname!)
      .pipe(
        catchError((err) => {
          this.error.set(err.error.message);
          return err;
        })
      )
      .subscribe();
  }
}
