import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-header data-carbon-theme="g100"></app-header>
      <div class="mt-20">
        <router-outlet class="w-screen"></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'DocHelper';
}
