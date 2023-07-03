import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet class="w-screen"></router-outlet>
  `,
})
export class AppComponent {
  title = 'DocHelper';
}
