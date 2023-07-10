import { Component, inject } from '@angular/core';
import { AuthService } from './core/authentication/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="authService.isLoaded()">
      <app-header data-carbon-theme="g100"></app-header>
      <div class="mt-20">
        <router-outlet class="w-screen"></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {
  authService = inject(AuthService);
  title = 'DocHelper';
}
